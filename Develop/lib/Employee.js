// TODO: Write code to define and export the Employee class
function getEmployee() {
    class Employee {
        constructor(name, id, title, email) {
            this.name = name;
            this.id = id;
            this.title = title;
            this.email = email;
        }
        getName() {
            console.log(name)
            return this.name;
        }
        getId() {
            console.log(id)
            return this.id;
        }

        getEmail() {
            console.log(this.email);
            return this.email;
        }
        getRole() {
            console.log(this.title);
            return 'Employee';
        }
    }
}

module.exports = getEmployee;