import { Dispatch, SetStateAction } from "react";
import styles from "./Searchbar.module.scss";

interface SearchbarPropsType {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  inputPlaceHolder: string;
}

function Searchbar({
  searchValue,
  setSearchValue,
  inputPlaceHolder,
}: SearchbarPropsType) {
  let timer: any = null;

  function throttling(event: React.ChangeEvent<HTMLInputElement>) {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        setSearchValue(event.target.value);
        console.log(searchValue);
      }, 500);
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    throttling(event);
  };
  return (
    <input
      className={styles.searchbar}
      placeholder={inputPlaceHolder}
      onChange={handleInputChange}
    />
  );
}

export default Searchbar;
