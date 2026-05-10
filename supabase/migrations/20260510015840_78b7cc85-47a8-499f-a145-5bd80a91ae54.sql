
CREATE TABLE public.race_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  race_id integer NOT NULL,
  session_type text NOT NULL CHECK (session_type IN ('race','sprint')),
  position integer NOT NULL,
  driver_name text NOT NULL,
  team_name text NOT NULL,
  points numeric NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (race_id, session_type, position)
);

ALTER TABLE public.race_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read race results"
  ON public.race_results FOR SELECT
  USING (true);

INSERT INTO public.race_results (race_id, session_type, position, driver_name, team_name, points) VALUES
-- Australia race
(1,'race',1,'George Russell','Mercedes',25),
(1,'race',2,'Kimi Antonelli','Mercedes',18),
(1,'race',3,'Charles Leclerc','Ferrari',15),
-- China sprint
(2,'sprint',1,'George Russell','Mercedes',8),
(2,'sprint',2,'Charles Leclerc','Ferrari',7),
(2,'sprint',3,'Lewis Hamilton','Ferrari',6),
-- China race
(2,'race',1,'Kimi Antonelli','Mercedes',25),
(2,'race',2,'George Russell','Mercedes',18),
(2,'race',3,'Lewis Hamilton','Ferrari',15),
-- Japan race
(3,'race',1,'Kimi Antonelli','Mercedes',25),
(3,'race',2,'Oscar Piastri','McLaren Mercedes',18),
(3,'race',3,'Charles Leclerc','Ferrari',15),
-- Miami sprint
(6,'sprint',1,'Lando Norris','McLaren Mercedes',8),
(6,'sprint',2,'Oscar Piastri','McLaren Mercedes',7),
(6,'sprint',3,'Charles Leclerc','Ferrari',6),
-- Miami race
(6,'race',1,'Kimi Antonelli','Mercedes',25),
(6,'race',2,'Lando Norris','McLaren Mercedes',18),
(6,'race',3,'Oscar Piastri','McLaren Mercedes',15);
