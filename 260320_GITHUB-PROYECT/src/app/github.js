class Github {

    constructor(client_id, client_secret) {
        this.client_id = client_id;
        this.client_secret = client_secret;
        this.repositories_count = 7;
        this.repositories_sort = 'created: asc';
    }

    async fetchUser(user) {
        const userDataRequest = await fetch(`http://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);
        const repositoriesRequest = await fetch(`http://api.github.com/users/${user}/repos?client_id=$
        {this.client_id}&client_secret=${this.client_secret}&per_page=${this.repositories_count}&sort=${this.repositories_sort}`);

        const profile = await this.convertToJson(userDataRequest);
        const repositories = await this.convertToJson(repositoriesRequest);

        return {
            profile,
            repositories
        };
    }

    convertToJson(request) {
        return request.json();
    }
}

module.exports = Github;