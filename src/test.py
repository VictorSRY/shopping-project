
l =[]
f = True
count =0
counter =0
while f :
    istring = input()
    if count >= 5:
        if istring[0] == 'q' or istring == 'Q':
            break
    if len(istring) != 10:
        print("Invalid Input")
    else:
        count+=1
    l.append(istring)
list=[str(x) for x in range(10)]
for number in l:
    for ch in number:
        if not ch in list:
            counter+=1
            break
print(counter)