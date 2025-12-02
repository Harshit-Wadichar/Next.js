# Environment variable in next.js

- here i learned that there are two types of environment variables
1) for Frontend(which starts from NEXT_PUBLIC_) : available in both server and client pages

2) for Server: the simple environment variable are only avialable in server which needs to be hidden from all kind of users 

- there are mostly two kind of environment varible declaring files 
1) .env : here production env variables are written
2) .env.local : here local runtime specific env variable are written

- priority: .env.local(loads firstly in the app) > .env(loads after .env.local)