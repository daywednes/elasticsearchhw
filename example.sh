printf "\nPosting example 1\n"

curl --request POST 'http://localhost:3000/api/post/' \
--header 'Content-Type: application/json' \
--data-raw '{"id": "1",
"author": "minh1",
"title": "hello",
"content": "hello world",
"date": "1910-10-40"
}'

printf "\nPosting example 2\n"

curl --request POST 'http://localhost:3000/api/post/' \
--header 'Content-Type: application/json' \
--data-raw '{"id": "2",
"author": "minh2",
"title": "hello",
"content": "hello world",
"date": "1910-10-40"
}'

printf "\nPosting example 3\n"

curl --request POST 'http://localhost:3000/api/post/' \
--header 'Content-Type: application/json' \
--data-raw '{"id": "3",
"author": "minh3",
"title": "hello",
"content": "hello world",
"date": "1910-10-40"
}'

printf "\nQuery with id 1\n"
curl 'http://localhost:3000/api/post/1'

printf "\nQuery with id 2\n"
curl 'http://localhost:3000/api/post/2'

printf "\nQuery with id 3\n"
curl 'http://localhost:3000/api/post/3'

printf "\nDone\n"