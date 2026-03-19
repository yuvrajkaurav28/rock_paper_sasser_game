'''
workflw of project 
1. input form user
2. computer random choice (compurer choice randomly from rock, paper, sasser)
3. result (decide who win)   

cases 
a. rock
rock - rock -> tie
rock - paper -> paper win
rock - sasser -> rock win

b. paper 
paper - paper -> tie
paper - rock -> paper win
paper - sasser -> sasser win

c. sasser
sasser - sasser -> tie
sasser - rock -> rock win  
sasser - paper -> sasser win
'''

import random
itam_list = ["rock", "paper", "seassor"]

while True:
    user_input = input("Enter your choice (rock, paper, seassor): ")
    comp_choice = random.choice(itam_list)

    print(f"user choice: {user_input}, computer choice: {comp_choice}")

    if user_input == comp_choice:
        print("It's a tie!")

    elif user_input == "rock":
        if comp_choice== "paper":
            print("paper wins!")
        else:
            print("rock wins!")

    elif user_input == "paper":
        if comp_choice == "rock":
            print("paper wins!")
        else:
            print("seassor wins!")

    elif user_input == "seassor":
        if comp_choice == "rock":
            print("rock wins!")
        else:
            print("seassor wins!")

    else:
        print("Invalid input! Please choose rock, paper, or seassor.")
    
    
    play_again = input("\nDo you want to play again? (yes/no): ").lower()
    if play_again != "yes":
        print("Thanks for playing! Goodbye!")
        break





