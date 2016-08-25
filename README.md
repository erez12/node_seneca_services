# Environment args
### Logger
- LOGGER_SERVICE_PORT
- LOGGER_SERVICE_HOST
- LOGGER_TRANSPORT
###


+-------------------+
|   Storage         |
|                   |
|                   |
+-------------+-----+
              ^
              |
              |  Set/Insert: ()
              |
              |
         +----+----------------------+                                      +-------------------------+
         |                           |                                      |                         |
         |                           |    Log: (service, severity, message) |                         |        Set: (bag_id, lat, lon)
         |        Log Service        |  <-----------------------------------+     Traking Service     |   <----------------------------+
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
                      | Log_update(service, severity, message)                            |
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
