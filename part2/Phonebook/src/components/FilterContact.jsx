const FilterContact = ({filterName, handleFilterChange}) => {
  return (
    <div>
      filter shown with <input
        value={filterName}
        onChange={handleFilterChange}
      />
    </div>
  )
}

export default FilterContact