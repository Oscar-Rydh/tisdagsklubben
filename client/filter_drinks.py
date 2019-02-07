import json 

drinks = json.load(open('drinks.json', 'r'))
drinks = drinks['artiklar']['artikel']



whiskies = [drink for drink in drinks if drink.get('Varugrupp', None) == 'Whisky' ]

fixed_whiskies = []
for whisky in whiskies:
  new_whisky = {}
  for key in whisky.keys():
    new_whisky[key.lower()] = whisky[key] 
  fixed_whiskies.append(new_whisky)

filtered_whiskies = []
for current_whisky in fixed_whiskies:
  res = [filtered_whisky for filtered_whisky in filtered_whiskies if current_whisky['namn'] == filtered_whisky['namn'] and current_whisky['namn2'] == filtered_whisky['namn2']]
  if len(res) == 0:
    filtered_whiskies.append(current_whisky)

json.dump(filtered_whiskies, open('whiskies.json', 'w'))