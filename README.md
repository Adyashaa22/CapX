***Dynamic Multilevel Caching System***

**Overview**
This is a dynamic multilevel caching system that efficiently manages data across multiple cache levels. 
The system supports dynamic addition of cache levels, eviction policies, and data retrieval across these levels.

*Features*

I. Multiple cache levels (L1, L2, ..., Ln) with configurable sizes.

II. Support for two eviction policies: Least Recently Used (LRU) and Least Frequently Used (LFU).

III. Dynamic addition and removal of cache levels at runtime.

IV. Efficient data retrieval and insertion with cache level promotion and demotion.

V. Thread-safe implementation for concurrent reads and writes.


**How to Use**

Adding Cache Levels-
To add a new cache level, use the addCacheLevel method and specify the size and eviction policy.

Putting Data-
To insert data into the cache, use the put method.

Getting Data-
To retrieve data from the cache, use the get method.

Displaying Cache State-
To display the current state of each cache level, use the displayCache method.



**Implementation Details**

The implementation consists of the following classes:

LRU and LFU: Eviction policy classes that implement the Least Recently Used and Least Frequently Used policies, respectively.

CacheLevel: A class that represents each cache level, with properties for size, eviction policy, and cache data.

MultilevelCache: The main class that manages the cache levels, provides methods for adding and removing cache levels, and implements the caching logic.

**ACKNOWLEDGMENT**
This implementation was inspired by the problem statement provided by [https://d8it4huxumps7.cloudfront.net/uploads/submissions_case/66dac60432b78_Back-end_task.pdf].
