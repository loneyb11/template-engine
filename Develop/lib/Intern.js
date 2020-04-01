function getIntern() {

    class Intern extends Employee {
        constructor(name, id, title, email) {
            super(name, id, title, school);
            this.school = school;
        }
        getSchool() {
            console.log(this.school);
        }
        getRole() {
            return "Intern";
        }
    }
}

module.exports = getIntern;