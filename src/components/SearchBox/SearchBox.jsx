import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectNameFilter, changeFilter } from "../../redux/filtersSlice";
import styles from "./SearchBox.module.css";

export default function SearchBox() {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectNameFilter);

  const handleFilterChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={styles.container}>
      <label className={styles.text} htmlFor="search">
        Find contacts by name
      </label>
      <input
        type="text"
        id="search"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Search by name..."
      />
    </div>
  );
}
