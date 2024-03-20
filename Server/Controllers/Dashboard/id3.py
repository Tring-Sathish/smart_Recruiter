import pymongo

# Establish a connection to MongoDB
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["Recruiter"]
collection = db["candidates"]

try :
    length = 0
    for document in collection.find():
        print("*******")
        print(document)
        length = length + 1

    data = list(collection.find())  # Convert cursor to list
    print("data", data)
    average_marks_list = []
    for candidate in data:
        marks = [int(mark) for mark in candidate["marks"]]  # Convert marks from string to integer
        total_marks = sum(marks)
        number_of_marks = len(candidate["marks"])
        average_marks = total_marks / number_of_marks
        candidate["average_marks"] = average_marks
        average_marks_list.append(average_marks)

    def id3_sort(data):
        if len(data) <= 1:  # Base case: if the length of data is 0 or 1, return data as it is
            return data
        else:
            pivot = data[0]["average_marks"]
            
            # Initialize lists to store candidates based on comparison with pivot
            less_than_pivot = []
            equal_to_pivot = []
            greater_than_pivot = []
            
            # Iterate through each candidate to compare their average marks with the pivot
            for candidate in data:
                if candidate["average_marks"] < pivot:
                    less_than_pivot.append(candidate)
                elif candidate["average_marks"] == pivot:
                    equal_to_pivot.append(candidate)
                else:
                    greater_than_pivot.append(candidate)
                    
            return id3_sort(less_than_pivot) + equal_to_pivot + id3_sort(greater_than_pivot)


    sorted_data = id3_sort(data)

    for candidate in sorted_data:
        print("Candidate ID:", candidate["firstName"])
        print("Score :", candidate["average_marks"])

    # Find the candidate with the highest average marks
    max_average_marks = max(average_marks_list)
    candidates_with_max_average_marks = []
    for candidate in sorted_data:
        if candidate["average_marks"] == max_average_marks:
            candidates_with_max_average_marks.append(candidate)

    # Find the candidate with the lowest average marks
    min_average_marks = min(average_marks_list)
    candidates_with_min_average_marks = []
    for candidate in sorted_data:
        if candidate["average_marks"] == min_average_marks:
            candidates_with_min_average_marks.append(candidate)
except : 
    print("No data / Error in python")