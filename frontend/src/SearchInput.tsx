interface searchTextProps {
  searchText: string;
  onSearchTextChange: React.Dispatch<React.SetStateAction<string>>;
}
export function SearchInput({
  searchText,
  onSearchTextChange,
}: searchTextProps) {
  {
    /* Fix hard coded values like mt 25vh gap-10 later*/
  }
  return (
    <div className="flex w-full max-w-3xl">
      <input
        type="text"
        className="flex-1 border-2 border-black p-2 rounded-lg"
        placeholder="Search Campus"
        value={searchText}
        onChange={(e) => onSearchTextChange(e.currentTarget.value)}
      />
    </div>
  );
}
