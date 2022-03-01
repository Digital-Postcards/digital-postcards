imageListAyahs = [];
for i in range(32):
    imageListAyahs.append(str(i+1) + "A")
    imageListAyahs.append(str(i+1) + "B")
def imageImportMapJSAyahs(imageFile):
    return "import ayahs" + imageFile + " from " + "'./Post Cards/Ayahs/"+imageFile+".jpg';";
for i in imageListAyahs:
    print(imageImportMapJSAyahs(i));

imageListMammies = [];
# for i in range(44):
#     imageList.append("mammies" + str(i+1))
# for i in range(32):
#     imageList.append("ayahs"+str(i+1))
for i in range(44):
    imageListMammies.append(str(i+1) + "A")
    imageListMammies.append(str(i+1) + "B")
def imageImportMapJSMammies(imageFile):
    return "import mammies" + imageFile + " from " + "'./Post Cards/Mammies/"+imageFile+".jpg';";
for i in imageListMammies:
    print(imageImportMapJSMammies(i));
    


def imageImportMapJSObj(imageFile, i):
    return "{ id:" + str(i) + ', imageFileName:"' + str(imageFile) + '", imageFront: ' + str(imageFile) + "A, imageBack: " + str(imageFile) + "B},";
# for i in range(len(imageList)):
#     print(imageImportMapJS(imageList[i],i))

