import tkinter as tk
import os

# Define the text messages to be displayed
messages = [
    "GRASS CLICKER",
    "touch the grass to get grass",
    "you can buy things with grass",
    "go to https://grassclicker.vercel.app/ to play the game",
    "made by zk (p55d2k)",
]

current_message_index = 0  # Index to track the current message

def change_message():
    global current_message_index
    current_message_index = (current_message_index + 1) % len(messages)  # Loop back to the first message if reached the end
    text.config(text=messages[current_message_index])  # Update the label text
    text.after(1500, change_message)  # Schedule the next text change after 3 seconds (3000 milliseconds)

def reset():
    global current_message_index
    current_message_index = 0  # Reset the message index
    text.config(text=messages[current_message_index])  # Reset the label text

# Create the main window
window = tk.Tk()
window.title("Game Display")
window.geometry("1000x400")
window.attributes("-fullscreen", True)
window.configure(bg="black")

# Create the label to display the text
text = tk.Label(
    window,
    text=messages[current_message_index],
    fg="white",
    bg="black",
    font=("Roboto", 32),
)
text.pack(pady=50)

# Create the reset button
reset_button = tk.Button(
    window,
    text="Reset",
    command=reset,
    bg="black",
    fg="white",
    font=("Roboto", 12),
    relief=tk.FLAT,
)
reset_button.place(x=10, y=10)

close_button = tk.Button(
    window,
    text="Close",
    command=window.destroy,
    bg="black",
    fg="white",
    font=("Roboto", 12),
    relief=tk.FLAT,
)
close_button.place(x=60, y=10)

def toggle_fullscreen():
    window.attributes("-fullscreen", not window.attributes("-fullscreen"))

fullscreen_button = tk.Button(
    window,
    text="Fullscreen",
    command=toggle_fullscreen,
    bg="black",
    fg="white",
    font=("Roboto", 12),
    relief=tk.FLAT,
)
fullscreen_button.place(x=120, y=10)

def openwebbrowser():
    os.system('"C:\Program Files\Google\Chrome\Application\chrome.exe" --incognito http://localhost:5500/')

visit_button = tk.Button(
    window,
    text="Click here to play",
    command=openwebbrowser,
    bg="black",
    fg="blue",
    font=("Roboto", 30),
    relief=tk.FLAT,
)
visit_button.place(relx=0.5, rely=0.5, anchor=tk.CENTER)

# Start the text change loop
window.after(1500, change_message)  # Start the first text change after 3 seconds

# Run the main window loop
window.mainloop()
