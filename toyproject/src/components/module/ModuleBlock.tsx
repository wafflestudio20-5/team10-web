import styles from './ModuleBlock.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretDown,
  faCaretRight,
  faPaperclip,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { apiGetFile, apiGetModules } from '../../lib/api';
import { useSessionContext } from '../../context/SessionContext';
import { useNavigate, useParams } from 'react-router-dom';
import { ModuleInterface } from '../../lib/types';
import axios from 'axios';
import { toast } from 'react-toastify';

export const DownloadFile = ({
  file,
  token,
}: {
  file: string;
  token: string | null;
}) => {
  const originalFileURL = decodeURI(file);
  const urlParams = originalFileURL.split('modules/')[1].split('?X-Amz')[0];
  const parts = urlParams.split('.');
  const extension = parts[parts.length - 1];
  const handleDownload = async (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    await apiGetFile(file, token, urlParams, extension);
  };

  return (
    <span className={styles.download} onClick={handleDownload}>
      {urlParams}
    </span>
  );
};

const Module = ({
  module,
  openedToggles,
  handleSingleToggle,
  idx,
  token,
}: {
  module: ModuleInterface;
  openedToggles: boolean[];
  handleSingleToggle: (id: number) => void;
  idx: number;
  token: string | null;
}) => {
  return (
    <div className={styles.moduleContainer}>
      <header onClick={() => handleSingleToggle(idx)}>
        <FontAwesomeIcon
          icon={openedToggles[idx] ? faCaretDown : faCaretRight}
          className={styles.caret}
        />
        {module.name}
      </header>

      <article
        className={
          openedToggles[idx]
            ? styles.contentContainerShow
            : styles.contentContainer
        }
      >
        {module.module_content.map((content, contentIdx) => (
          <section
            key={contentIdx}
            className={openedToggles[idx] ? styles.contentShow : styles.content}
          >
            <FontAwesomeIcon icon={faPaperclip} className={styles.paperClip} />
            <DownloadFile file={content.url} token={token} />
            {/* <a href={content.url} download>
              download
            </a> */}
          </section>
        ))}
      </article>
      {/* )} */}
    </div>
  );
};

export default function ModuleBlock() {
  const { token, getRefreshToken } = useSessionContext();
  const { subjectid } = useParams();
  const [modules, setModules] = useState<ModuleInterface[]>([]);
  // module의 개수와 같은 개수의 1로 이루어진 배열 생성 (처음에는 모든 모듈이 열려 있는 상태)
  // 모듈(토글)이 열려 있으면 1, 아니면 0
  const [openedToggles, setOpenedToggles] = useState<boolean[]>([]);
  // Array(modules.length).fill(true)

  const navigate = useNavigate();
  // 각 모듈 헤더 클릭 시 접고 펼치기
  const handleSingleToggle = (id: number) => {
    const newOpenedToggles = [
      ...openedToggles.slice(0, id),
      !openedToggles[id],
      ...openedToggles.slice(id + 1),
    ];
    setOpenedToggles(newOpenedToggles);
  };

  // 하나라도 펼쳐진 모듈이 있으면 모든 모듈 접기, 모두 접혀있으면 모든 모듈 펼치기
  const handleAllToggle = () => {
    if (openedToggles.includes(true)) {
      const newOpenedToggles = Array(modules.length).fill(false);
      setOpenedToggles(newOpenedToggles);
    } else {
      const newOpenedToggles = Array(modules.length).fill(true);
      setOpenedToggles(newOpenedToggles);
    }
  };

  const getModules = async (token: string | null, class_id: number) => {
    const res = await apiGetModules(token, class_id);
    return res;
  };

  useEffect(() => {
    (async () => {
      try {
        const id = Number(subjectid);
        const res = await getModules(token, id);
        setModules(res.data[0].weekly);
        setOpenedToggles(Array(res.data[0].weekly.length).fill(true));
      } catch {
        const id = Number(subjectid);
        const localRefreshToken = localStorage.getItem('refresh');
        const resToken = await getRefreshToken(
          localRefreshToken ? localRefreshToken : 'temp'
        );
        const newToken = resToken.data.access;
        const res = await getModules(newToken, id);
        setModules(res.data[0].weekly);
        setOpenedToggles(Array(res.data[0].weekly.length).fill(true));
      }
    })();
  }, [subjectid, token]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerbar}>
        <button onClick={handleAllToggle}>
          {openedToggles.includes(true) ? '모든 모듈 접기' : '모든 모듈 펼치기'}
        </button>
      </div>
      <article>
        {modules &&
          modules.map((module, idx) => (
            <Module
              key={module.id}
              module={module}
              idx={idx}
              openedToggles={openedToggles}
              handleSingleToggle={handleSingleToggle}
              token={token}
            />
          ))}
      </article>
    </div>
  );
}
