DROP TABLE IF EXISTS browse_times CASCADE;

CREATE TABLE browse_times
(
  id                  SERIAL PRIMARY KEY,

  user_id             INTEGER REFERENCES users(id) ON DELETE CASCADE,
  website_hostname    VARCHAR(255) REFERENCES websites(hostname) ON DELETE CASCADE,

  datetime_startdate  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  duration INTERVAL   NOT NULL DEFAULT '1 minute'
)
