CREATE TABLE "to_do_list"
( "id" SERIAL PRIMARY KEY,
"task_name" VARCHAR (250) NOT NULL,
"completion_time" INTEGER NOT NULL,
"complete" BOOLEAN );

-- INSERT INTO "to_do_list"
-- ("task_name", "completion_time", "complete")
-- VALUES
-- ('taxes', 4, FALSE);
('get groceries', 1, FALSE),
('renew my driver liscense', 3, FALSE),
('prime homework', 8, TRUE);