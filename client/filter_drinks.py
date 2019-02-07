import json 

drinks = json.load(open('drinks.json', 'r'))
drinks = drinks['artiklar']['artikel']



whiskies = [drink for drink in drinks if drink.get('Varugrupp', None) == 'Whisky' ]

for whisky in whiskies:
  for key in whisky.keys():
    whisky[key.lower()] = whisky.pop(key)

filtered_whiskies = []
last_len = 1
for current_whisky in whiskies:
  for whisky in whiskies:
    if whisky.get('namn') == current_whisky.get('namn') and \
      whisky.get('namn2') == current_whisky.get('namn2') and \
      whisky.get('alkoholhalt') == current_whisky.get('alkoholhalt') and \
      whisky.get('prisinklmoms') == current_whisky.get('prisinklmoms'):
        whiskies.remove(whisky)
  filtered_whiskies.append(current_whisky)

json.dump(whiskies, open('whiskies.json', 'w'))