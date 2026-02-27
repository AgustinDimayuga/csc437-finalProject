interface DropDownProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  classNameDiv?: string;
  arraySelection: T[];
  searchText: string;
  getSearchValue: (item: T) => string;
}

export function DropDown<T>({
  className,
  arraySelection,
  classNameDiv,
  searchText,
  getSearchValue,
  ...props
}: DropDownProps<T>) {
  const filteredItems = arraySelection.filter((item) =>
    getSearchValue(item).toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <div className={className} {...props}>
      {filteredItems.map((item, index) => (
        <div className={classNameDiv} key={index}>
          {getSearchValue(item)}
        </div>
      ))}
    </div>
  );
}
