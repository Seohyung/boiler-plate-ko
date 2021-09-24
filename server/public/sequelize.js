async function getUser() {
  try {
    const res = await axios.get('/users');
    const users = res.data;
    console.log(users);

    const tbody = document.querySelector('#user-list tbody');
    tbody.innerHTML = '';
    users.map(function (user) {
      const row = document.createElement('tr');
      // 로우 셀 추가
      let td = document.createElement('td');
      td.textContent = user.id;
      row.appendChild(td);
      td = document.createElement('td');
      td.textContent = user.email;
      row.appendChild(td);
      td = document.createElement('td');
      td.textContent = user.password;
      row.appendChild(td);
      tbody.appendChild(row);
    });
  } catch (err) {
    console.error(err);
  }
}

document.getElementById('user-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = e.target.useremail.value;
  const password = e.target.userpassword.value;
  if (!email) {
    return alert('이메일을 입력하세요');
  }
  if (!password) {
    return alert('비밀번호를 입력하세요');
  }
  try {
    await axios.post('/users', { email, password });
    getUser();
  } catch (err) {
    console.error(err);
  }
  e.target.useremail.value = '';
  e.target.userpassword.value = '';
});
