async function getUser() {
    const username = document.getElementById('input').value;
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();

    if (response.ok) {
        document.getElementById('prof-img').src = data.avatar_url;
        document.getElementById('name').textContent = data.name || data.login;
        document.getElementById('username').textContent = `@${data.login}`;
        document.getElementById('username').href = data.html_url;
        document.getElementById('bio').textContent = data.bio || "No bio available";
        document.getElementById('repo').textContent = data.public_repos;
        document.getElementById('followers').textContent = data.followers;
        document.getElementById('following').textContent = data.following;
    } else {
        alert('User not found');
    }
}

// Add event listener for Enter key
document.getElementById('input').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        getUser();
    }
});
