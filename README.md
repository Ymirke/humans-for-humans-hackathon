# Humans for Humans Hackathon! 💻 👩‍💻 🧑‍💻
This is an optional starting point for the Humans for Humans hackathon.

Best of luck to all of you! ⭐️

Read more about [(our initial project)](https://github.com/Ymirke/graduation-project).

# About project:
This is  an easy-to-use platform that can be used by organizations to provide mental health support for human traffic victims. The application currently supports two types of users: patients and psychologists. Patients can anonymously register, login and leave a message (create a case) for a mental health specialist and close the case at any time. Psychologists must already be in a system in order to login, work with cases, write notes and answer/talk to patients. The conversation between two parties works like a chat.

# To set up on your machine: 
Supply a .env file in the server folder which should with the following variables:

MONGO_URI={YOUR_MONGO_DB_URI}

JWTSECRET={YOUR_JWT_SECRET}

NODE_ENV=dev

```bash
git clone git@github.com:Ymirke/graduation-project.git
cd graduation-project
npm run installAll
npm run dev
```
