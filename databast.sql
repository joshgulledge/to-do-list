CREATE TABLE "to_do_list"
( "id" SERIAL PRIMARY KEY,
"task_name" VARCHAR (250) NOT NULL,
"completion_time" INTEGER NOT NULL,
"complete" BOOLEAN );
