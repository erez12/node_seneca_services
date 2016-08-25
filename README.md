# Environment args
### Logger
- LOGGER_SERVICE_PORT
- LOGGER_SERVICE_HOST
- LOGGER_TRANSPORT
###


  +-------------------+                                             +------------------+
  |   Storage         |                                             | Storage (Redis)  |
  |                   |                                             |                  |
  |                   |                                             |                  |
  +-------------+-----+                                             +--------------+---+
                ^                                                                  ^
                |                                                                  |
                |  Set/Insert: ()                                                  |  updateTracking: (bag_id, lon, lat)
                |                                                                  |
     +----------+----------------+                                      +----------+--------------+
     |                           |                                      |                         |
     |                           |    Log: (ser^ice, se^erity, message) |                         |        Set: (bag_id, lat, lon)
     |        Log Ser^ice        |  <-----------------------------------+     Traking Ser^ice     |   <----------------------------+
     |                           |                                      |                         |
     |                           |                                      |                         |
     |                           |                                      |                         |
     +------------+--------------+                                      +-------------+-----------+
                  |                                                                   |
                  |                                                                   |
                  |                                                                   |
                  |                                                                   |
                  |                                                                   |
                  |                                                                   |
                  |                                                                   |   Location_update: (bag id, lat, lon)
                  | Log_update(ser^ice, se^erity, message)                            |
                  |                                                                   |
                  |                                                                   |
                  |                                                                   |
                  |                 +---------------------------------+               |
                  |                 |                                 |               |
                  |                 |                                 |               |
                  |                 |                                 |               |
                  +------------->   |            Web App              |   <-----------+
                                    |                                 |
                                    |                                 |
                                    |                                 |
                                    +---------------------------------+
