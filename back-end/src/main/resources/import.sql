INSERT INTO "public"."users" ("id", "first_name", "password", "second_name", "username") VALUES (1, 'first', 'pass123', 'second', 'username');
INSERT INTO "public"."accounts" ("id", "balance", "iban", "user_id") VALUES (1, 3000, 'NL3000', 1);
INSERT INTO "public"."accounts" ("id", "balance", "iban", "user_id") VALUES (2, 6000, 'NL6000', 1);
INSERT INTO "public"."categories" ("id", "name") VALUES (1, 'food');