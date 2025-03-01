# Task Overflow
features
- calendar ui

- Assign projects to team members based on their productivity
    - Teams work together to estimate the time required to finish the task 
    - Measure the time taken by user and average with previous task to determine productivity in relation to expectations
    - Helps admin give hardest task to most productive employee

- AI auto-categorizes tasks between available categories based on title/description, leaves it uncategorized if it is unsure


Data Schema
- User
    - Name
    - skills
        {
            skill: productivity;
        }
    - productivity
- Task 
    - Deadline
    - Time Expected to Finish / Difficulty
    - Priority
    - Finished?
    - Category
    - Tags (skills?)
    - Employee - [Users]
    - Title
    - Description
- Event (meetings, etc.)
    - Datetime
    - Category
    - Tags (skills?)
    - Employee - [Users]
- Blockout Times
- Project
    - Tasks
    - Progress?
    - Admins - [Users]
    - Employees - [Users]
    - Available Categories