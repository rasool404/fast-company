import React, { useState, useEffect } from "react";
import _ from "lodash";
import api from "../../../api";
import { paginate } from "../../../../utils/paginate";
import PropTypes from "prop-types";
import Pagination from "../../common/pagintation";
import GroupList from "../../common/group-list";
import SearchStatus from "../../ui/search-status";
import UsersTable from "../../ui/users-table";
import SearchField from "../../common/form/search-field";

const UsersListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const pageSize = 8;

  const [users, setUsers] = useState();
  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((item) => item._id !== userId));
  };

  const handleToggleBookMark = (id) => {
    const newUsers = [...users];
    const userIndex = newUsers.findIndex((user) => user._id === id);
    newUsers[userIndex].bookmark = !users[userIndex].bookmark;
    setUsers(newUsers);
  };

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf, searchQuery]);

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
    setSearchQuery("");
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  const handleSearchQuery = ({ target }) => {
    setSearchQuery(target.value);
    setSelectedProf();
  };

  const decreaseCurrentPage = () => setCurrentPage((prevPage) => prevPage - 1);
  const increaseCurrentPage = () => setCurrentPage((prevPage) => prevPage + 1);

  if (users) {
    const foundUsers = searchQuery
      ? users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      : selectedProf
        ? users.filter(
          (user) =>
            JSON.stringify(user.profession) === JSON.stringify(selectedProf)
        )
        : users;

    const count = foundUsers.length;

    const sortedUsers = _.orderBy(foundUsers, [sortBy.path], [sortBy.order]);

    if (currentPage > Math.ceil(count / pageSize)) {
      setCurrentPage((prev) => prev - 1);
    }

    const usersCrop = paginate(sortedUsers, currentPage, pageSize);

    const clearFilter = () => {
      setSelectedProf();
      setSearchQuery("");
    };

    return (
      <div className="col-lg-8 mx-auto p-3 py-md-5 d-flex">
        {professions && (
          <div className="d-flex flex-column flex-shrink-0 me-3">
            <GroupList
              items={professions}
              onItemSelect={handleProfessionSelect}
              selectedItem={selectedProf}
            />
            <button className="btn btn-secondary" onClick={clearFilter}>
              Показать всех
            </button>
          </div>
        )}
        <main>
          <SearchStatus length={count} />
          <SearchField
            onChange={handleSearchQuery}
            value={searchQuery}
            placeholder="Найти..."
          />
          {!!count && (
            <UsersTable
              users={usersCrop}
              onSort={handleSort}
              selectedSort={sortBy}
              onDelete={handleDelete}
              onToggleBookMark={handleToggleBookMark}
            />
          )}
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onDecreaseCurrentPage={decreaseCurrentPage}
            onIncreaseCurrentPage={increaseCurrentPage}
          />
        </main>
      </div>
    );
  }
  return <div>Loading...</div>;
};

UsersListPage.propTypes = {
  users: PropTypes.array
};

export default UsersListPage;
