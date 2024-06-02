import inquirer from "inquirer";
class Student {
    name;
    studentID;
    course;
    balance;
    constructor(name) {
        this.name = name;
        this.course = [];
        this.balance = 0;
        this.studentID = this.generateStudentID();
    }
    generateStudentID() {
        return Math.floor(10000 + Math.random() * 90000).toString();
    }
    enroll(course) {
        this.course.push(course);
        console.log(`${this.name} is now enrolled in ${course}`);
    }
    viewBalance() {
        console.log(`${this.name} remaining balance is ${this.balance}`);
    }
    payTutionFee(fee) {
        this.balance -= fee;
        console.log(`Your Fee is paid ${fee}`);
    }
    showStatus() {
        console.log(`Student Name: ${this.name}`);
        console.log(`Student ID: ${this.studentID}`);
        console.log(`Student balance: ${this.balance}`);
    }
    getBalance() {
        return this.balance;
    }
    setBalance(amount) {
        this.balance += amount;
        console.log(`${this.name} amount deposited`);
    }
}
class StudentManager {
    students;
    constructor() {
        this.students = [];
    }
    findStudentbyID(student_ID) {
        return this.students.find((std) => std.studentID === student_ID);
    }
    addStudent(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(`Student: ${name} added successfully: Student ID: ${student.studentID}`);
    }
    enrollStudent(student_ID, course) {
        let student = this.findStudentbyID(student_ID);
        if (student) {
            student.enroll(course);
            console.log(`${student.name} enrolled in ${course} successfully`);
        }
    }
    viewStudentBalance(student_ID) {
        let student = this.findStudentbyID(student_ID);
        if (student) {
            student.viewBalance();
        }
    }
    payStudentFee(student_ID, amount) {
        let student = this.findStudentbyID(student_ID);
        if (student) {
            student.setBalance(amount);
        }
        else {
            console.log(`${student_ID} not found`);
        }
    }
    showStudentStatus(student_ID) {
        let student = this.findStudentbyID(student_ID);
        if (student) {
            student.showStatus();
        }
    }
}
async function main() {
    let studentManager = new StudentManager();
    for (let condition = true; condition;) {
        let options = await inquirer.prompt({
            name: "choice",
            type: "list",
            message: "Select any option",
            choices: [
                "Add Student",
                "Enroll Student",
                "View Student Balance",
                "Pay Fee",
                "Show Status",
                "Exit",
            ],
        });
        switch (options.choice) {
            case "Add Student":
                let nameInput = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a Student name",
                    },
                ]);
                studentManager.addStudent(nameInput.name);
                break;
            case "Enroll Student":
                let enrollStudent = await inquirer.prompt([
                    {
                        name: "StudentID",
                        type: "number",
                        message: "Enter a student ID",
                    },
                    {
                        name: "courseName",
                        message: "Please the following course ",
                        type: "list",
                        choices: [
                            "Web Development",
                            "Generative AI",
                            "Block Chain",
                            "Cloud Computing",
                        ],
                    },
                ]);
                studentManager.enrollStudent(enrollStudent.StudentID, enrollStudent.selectCourse);
                break;
            case "View Student Balance":
                let balance = await inquirer.prompt({
                    name: "studentID",
                    type: "number",
                    message: "Enter a Student ID ",
                });
                studentManager.viewStudentBalance(balance.studentID);
                break;
            case "Pay Fee":
                let fee = await inquirer.prompt([
                    {
                        name: "studentID",
                        type: "number",
                        message: "Enter a student ID",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to pay",
                    },
                ]);
                studentManager.payStudentFee(fee.studentID, fee.amount);
                break;
            case "Show Status":
                let status = await inquirer.prompt([
                    {
                        name: "studentID",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                ]);
                studentManager.showStudentStatus(status.studentID);
                break;
            case "Exit":
                condition = false;
        }
    }
}
main();
