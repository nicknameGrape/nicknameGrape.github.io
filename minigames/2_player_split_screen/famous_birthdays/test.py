wins=1
losses=19
days=20

def battle():
	global wins
	global losses
	global days
	days += 1
	if days%7 == 6:
		losses += 1
	else:
		wins += 1
	print("days:", days, "wins:", wins, "losses:", losses, "ratio:", wins/days)

while days<100:
	battle()
