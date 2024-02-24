class Survey {
    constructor(id, title, description, create_at, update_at) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.create_at = create_at;
        this.update_at = update_at;
    }
}

module.exports = Survey;