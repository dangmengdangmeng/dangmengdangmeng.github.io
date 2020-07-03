import React, { useState } from 'react';
import { YsGlobal } from '@global/handleGlobal';

const UserListSearch = props => {
  const { userListInner } = YsGlobal.languageInfo;
  const { search } = props;
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = e => {
    setInputValue(e.target.value);
    search(e.target.value);
  };
  const cancelSearch = () => {
    setInputValue('');
    search('');
  };
  // const keypress = e => {
  //   if (e.which !== 13) {
  //     return;
  //   }
  //   search(inputValue);
  // };
  return (
    <div className="userlist-search">
      <span className="searchBtn icon-search"></span>
      <input
        className="searchInput"
        type="text"
        // onKeyPress={keypress}
        onChange={handleInputChange}
        value={inputValue}
        placeholder={userListInner.searchPlacehoder}
      />
      <div className="closeInput" onClick={cancelSearch}></div>
    </div>
  );
};
export default UserListSearch;
