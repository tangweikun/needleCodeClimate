export const nextPlan = (allPlans, today) => {
  const latestPlan = allPlans[0].testTimes

  let chosenPlan = []
  let when = today.format('YYYY-MM-DD')
  for (let index = 0; index <= 6; index++) {
    const thisDay = today
      .locale('en')
      .format('dddd')
      .toLowerCase()
    const thisDaysTestTimes = latestPlan[thisDay]
    if (thisDaysTestTimes.length && !chosenPlan.length) {
      chosenPlan = thisDaysTestTimes
      when = today.format('YYYY-MM-DD')
    }
    today.add(1, 'days')
  }
  return { plan: chosenPlan, when }
}
