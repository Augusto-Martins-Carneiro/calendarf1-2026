
CREATE TABLE public.driver_standings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_name text NOT NULL UNIQUE,
  team_name text NOT NULL,
  points numeric NOT NULL DEFAULT 0,
  position integer NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.constructor_standings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_name text NOT NULL UNIQUE,
  points numeric NOT NULL DEFAULT 0,
  position integer NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.driver_standings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.constructor_standings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read driver standings"
  ON public.driver_standings FOR SELECT USING (true);

CREATE POLICY "Public can read constructor standings"
  ON public.constructor_standings FOR SELECT USING (true);

INSERT INTO public.driver_standings (position, driver_name, team_name, points) VALUES
(1,'Kimi Antonelli','Mercedes',100),
(2,'George Russell','Mercedes',80),
(3,'Charles Leclerc','Ferrari',59),
(4,'Lando Norris','McLaren Mercedes',51),
(5,'Lewis Hamilton','Ferrari',51),
(6,'Oscar Piastri','McLaren Mercedes',43),
(7,'Max Verstappen','Red Bull Ford',26),
(8,'Oliver Bearman','Haas Ferrari',17),
(9,'Pierre Gasly','Alpine Mercedes',16),
(10,'Liam Lawson','Racing Bulls Honda',10),
(11,'Franco Colapinto','Alpine Mercedes',7),
(12,'Arvid Lindblad','Racing Bulls Honda',4),
(13,'Isack Hadjar','Red Bull Ford',4),
(14,'Carlos Sainz','Williams Mercedes',4),
(15,'Gabriel Bortoleto','Audi',2),
(16,'Esteban Ocon','Haas Ferrari',1),
(17,'Alexander Albon','Williams Mercedes',1),
(18,'Nico Hulkenberg','Audi',0),
(19,'Valtteri Bottas','Cadillac Ferrari',0),
(20,'Sergio Pérez','Cadillac Ferrari',0),
(21,'Fernando Alonso','Aston Martin Honda',0),
(22,'Lance Stroll','Aston Martin Honda',0);

INSERT INTO public.constructor_standings (position, team_name, points) VALUES
(1,'Mercedes',180),
(2,'Ferrari',110),
(3,'McLaren Mercedes',94),
(4,'Red Bull Ford',30),
(5,'Alpine Mercedes',23),
(6,'Haas Ferrari',18),
(7,'Racing Bulls Honda',14),
(8,'Williams Mercedes',5),
(9,'Audi',2),
(10,'Cadillac Ferrari',0),
(11,'Aston Martin Honda',0);
