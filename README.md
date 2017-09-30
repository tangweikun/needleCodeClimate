# needle

## Glossary

- Measurement History 测量历史记录 a table that shows treatment plan and measurement times in relation to that plan
- Digestive State 分餐 measurement relationship to meal time or sleep, adding important context to the blood glucose result
- Guidance 指南 suggestions to help the user operate the BG1
- Draw Blood 抽血 take users blood and apply to test strip
- Treatment Plan 模组 describes a week of measurement timings
- Measurement Time 应测时间 describes on element in a treatment plan

## Design notes

- SDK does not provide a disconnect, therefore the user must remove the device between tests
- Is it worth providing re-test functionality, how to go about it?

### BG1 connection process

1. call Start Discovery sdk method
1. listen for events
1. receive Detect Device event
1. call connect sdk method
1. receive connection established event / connection failed event
1. receive test strip inserted event
1. receive blood detected event
1. recieve measurement result in mg/dL / measure error event with error code