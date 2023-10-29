## Usage

Start services and wait for all the be fully started: 

```
docker-compose up --build -d
```

Trigger message sending: 

```
POST http://localhost:3000/send
```
