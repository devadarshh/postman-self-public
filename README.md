
# How to run it locally

## Step 1: Clone this repository

### 1.1: Open terminal and paste the line below

```
git clone https://github.com/ashutosh017/postman-self.git
```

### 1.2: Open the project folder in vs code

```
code ./postman-self -r
```

## Step 2: Setting up frontend

### 2.1: Open terminal in vs code and go to the frontend folder

```
cd frontend 
```

### 2.2: Install dependencies

```
npm install
```

### 2.3: Start the devlopment server

```
npm run dev
```

## Step 3: Setting up backend

### Note

setting up backend little complex for beginners so if you don't want to setup backend then it's fine, frontend will still work but the only functionality you can't get on frontend is you won't be able to see your history in history section.

### 3.1: Open a new terminal and go to backend folder and install dependencies

```
cd backend && npm install
```

### 3.2 Copy contents of **.env.example** file to new **.env** file

If you are on Linux:
```
cp .env.example .env
```

if you are on windows then do it manually.

### 3.3 Get a postgresql connection string

1. If you want online running instance of postgres db then you can checkout Aiven, Render, or any other website to get your connection string.
2. If you have a postgres installed on your system then you can create a new db and fill the values in your connection string. For eg: if your username is **ashutosh** and password is **ilovekiara** and db_name is **postman** then you connection string should look like this: <br>`postgresql://ashutosh:ilovekiara@localhost:5432/postman`. <br>
3. Also you can get a running instance of postgres db using docker by simply running this command in your terminal: 
<br>`docker run --name some-postgres -e POSTGRES_USER=ashutosh -e POSTGRES_PASSWORD=ilovekiara -e POSTGRES_DB=postman -p 5432:5432 -d postgres`. 
<br>You can edit this command according to your needs. And create a connection string same as described in Point No. 2.
5. And finally paste the connection string in front of `DATABASE_URL=` in your **.env** file.

### 3.4 Migrate the db and generate Prisma client

```
npx prisma migrate dev
```

After pressing enter it ask you the migration name, give any name you want and press enter. And after this run this second command:

```
npx prisma generate
```

And your backend is connected to your database.


### 3.4 Provide backend url to frontend

1. In your **frontend** folder create a **.env** file and paste this:
<br> `VITE_BACKEND_URL=http://localhost:3000`<br>

### 3.5 Start backend server
```
npm run dev
```
