CREATE TABLE "taskList" (
    "id" SERIAL PRIMARY KEY,
    "task" VARCHAR(500) NOT NULL,
    "complete" VARCHAR(500)
);

INSERT INTO "taskList"
    ("task", "complete")
    VALUES
    ('Wash dishes', 'complete'),
    ('Do laundry', 'not complete'),
    ('Cook dinner', 'not complete');
