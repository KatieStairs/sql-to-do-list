CREATE TABLE "taskList" (
    "id" SERIAL PRIMARY KEY,
    "task" VARCHAR(500),
    "complete" VARCHAR(500)
);

INSERT INTO "taskList"
    ("task", "complete")
    VALUES
    ('Wash dishes', 'TRUE'),
    ('Do laundry', 'FALSE'),
    ('Cook dinner', 'FALSE');
    
SELECT * FROM "taskList"
	ORDER BY "id";
	
UPDATE "taskList"
	SET "complete"='TRUE'
	WHERE "id"=2;
	
DROP TABLE "taskList";