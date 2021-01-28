# mp

react-reconciler

| 协调阶段                 | 开始提交         | 提交阶段                  | 提交完成         |
|-------------------------|----------------|--------------------------|-----------------|
| createInstance          | prepareCommit  | appendChild              | resetAfterCommit|
| createTextInstance      |                | appendChildToContainer   | commitMount     |
| shouldSetTextContent    |                | insertBefore             |                 |
| appendInitialChild      |                | insertInContainerBefore  |                 |
| finalizeInitialChildren |                | removeChild              |                 |
| prepareUpdate           |                | removeChildFromContainer |                 |
|                         |                | commitTextUpdate         |                 |
|                         |                | commitUpdate             |                 |
|                         |                | resetTextContent         |                 |
|                         |                | clearContainer         |                 |
