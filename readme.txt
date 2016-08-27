
1. Please refer to structure.txt and system_desgin.txt

2. DB - Note: I assumed that logger and tracking should each have their own storage (The challenge doesn't states...)
  2.1 - Tracking Module - I decided to use redis. Redis hash has O(1) update time and
                          i assumed that this module will have many concurrent clients
                          making location updates every X seconds.
                          Note: Should we need backtracking of path, we can use redis queues
  2.2 - Logging Service - I decided to use an SQL db (sqlite for simplicity). I preferred to use SQL DB to allow
                          easy log analyzing via queries.
                          Note: it really depends on the questions we want to ask. For deep analyzing i would
                          actually use elastic search.

3. Communication - Services communicate using Seneca with transport set to http (can be changed later).
                   Tracking service has additional REST endpoint to allow client update their location.
                   To allow "real-time" updates, the web-app communicate with UI using socket.io.

4. Information flow - For simplicity and since i wanted to provide "real-time" updates on UI, I decided that
                      information should flow from logger and tracking services to the web app and UI.
                      As UI grow, and new features added (such as update per specific bag), i guess we can add
                      "getters" from the web-app to the tracking service.

