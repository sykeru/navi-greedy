import os
import sys
import time
from heapq import heappush, heappop  # Data structure
import folium
import webbrowser
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from tkinter import *
from customtkinter import *
from PIL import ImageTk, Image

directory = os.path.dirname(os.path.realpath(__file__))
print(directory)

class DijkstraAlgorithm:
    def __init__(self):
        self.way = None
        self.node_data = None
        self.graph_walk = {
            'A': {'W': 125.89, 'S': 61.72, 'X': 68.05},
            'S': {'A': 61.72, 'B': 64.11},
            'B': {'S': 64.11, 'C': 77.59, 'D': 125.59},
            'C': {'B': 77.59},
            'D': {'B': 125.59, 'Y': 69.35},
            'Y': {'D': 69.35, 'E': 180.45},
            'E': {'Y': 180.45, 'F': 69.66},
            'F': {'E': 69.66, 'V': 51.48, 'U': 65.86},
            'U': {'F': 65.86, 'J': 58.94},
            'J': {'U': 58.94, 'R': 47.63, 'T': 48.85},
            'T': {'J': 48.85, 'K': 167.81},
            'K': {'T': 167.81},
            'R': {'J': 47.63, 'I': 52.36},
            'I': {'R': 52.36, 'H': 68.12, 'L': 134.22},
            'H': {'I': 68.12, 'G': 67.68},
            'G': {'H': 67.88, 'N': 138.98, 'V': 51.48},
            'V': {'F': 51.48, 'G': 43.06},
            'L': {'I': 134.22, 'M': 32.68},
            'M': {'L': 32.68, 'N': 112.95},
            'N': {'M': 112.95, 'G': 138.98, 'O': 76.44, 'Z': 31.09},
            'O': {'N': 76.44, 'W': 96.47},
            'W': {'O': 96.47, 'A': 125.89},
            'Z': {'N': 31.09, 'P': 41.75},
            'P': {'Z': 41.75, 'Q': 104.79},
            'Q': {'P': 104.79, 'X': 201.92},
            'X': {'Q': 201.92, 'A': 68.05}
        }

        self.graph_car = {
            'A': {'S': 61.72},
            'S': {'B': 64.11},
            'B': {'C': 77.59, 'D': 125.59},
            'C': {'B': 77.59},
            'D': {'Y': 69.35},
            'Y': {'E': 180.45},
            'E': {'F': 69.66},
            'F': {'V': 51.48, 'U': 65.86},
            'U': {'J': 58.94},
            'J': {'R': 47.63, 'T': 48.85},
            'T': {'J': 48.85, 'K': 167.81},
            'K': {'T': 167.81},
            'R': {'I': 52.36},
            'I': {'L': 134.22},
            'H': {'I': 68.12},
            'G': {'H': 67.88},
            'V': {'G': 43.06},
            'L': {'M': 32.68},
            'M': {'N': 112.95},
            'N': {'O': 76.44, 'Z': 31.09},
            'O': {'W': 96.47},
            'W': {'A': 125.89},
            'Z': {'P': 41.75},
            'P': {'Q': 104.79},
            'Q': {'P': 104.79, 'X': 201.92},
            'X': {'Q': 201.92, 'A': 68.05}
        }

        self.folium_coordinates = {
            'A': [14.196445, 120.881170],
            'S': [14.196591, 120.881750],
            'B': [14.196728, 120.882326],
            'C': [14.197407, 120.882174],
            'D': [14.196996, 120.883211],
            'Y': [14.197573, 120.883547],
            'E': [14.199154, 120.882823],
            'F': [14.199789, 120.882550],
            'U': [14.200363, 120.882408],
            'J': [14.200878, 120.882219],
            'T': [14.201279, 120.882200],
            'K': [14.202772, 120.881813],
            'R': [14.200753, 120.881798],
            'I': [14.200650, 120.881301],
            'H': [14.200050, 120.881491],
            'G': [14.199477, 120.881669],
            'V': [14.199635, 120.882071],
            'L': [14.200348, 120.880102],
            'M': [14.200106, 120.880155],
            'N': [14.199076, 120.880428],
            'O': [14.198708, 120.880535],
            'W': [14.197671, 120.880823],
            'Z': [14.199010, 120.880125],
            'P': [14.198922, 120.879772],
            'Q': [14.197131, 120.880277],
            'X': [14.196222, 120.880485],
            'AB': [14.198723, 120.881381],
            'AC' : [14.198588, 120.881807]
        }

    def map(self, coordinates, final_dest):
        route_coordinates = coordinates

        m = folium.Map(location=[14.199677, 120.881700], zoom_start=18)
        folium.PolyLine(locations=route_coordinates, color='blue', weight=5).add_to(m)
        for mark in final_dest:
            folium.Marker(location=self.folium_coordinates[mark],
                          icon=folium.Icon(icon="glyphicon-star")).add_to(m)
        m.save('route_map.html')
        # webbrowser.open("route_map.html")
        chrome_options = Options()
        chrome_options.add_argument('--headless')
        chrome_options.add_argument('--window-size=900x1400')
        driver = webdriver.Chrome(options=chrome_options)
        driver.maximize_window()
        driver.get(f"file:///D:/Navi-Greedy/route_map.html")
        time.sleep(1)
        driver.save_screenshot("screenshot.png")

    def dijkstra(self, src, route=False):
        inf = sys.maxsize
        self.node_data = {node: {'cost': inf, 'pred': []} for node in self.graph_walk}
        self.node_data[src]['cost'] = 0
        visited = set()
        min_heap = [(0, src)]

        while min_heap:
            cost, temp = heappop(min_heap)
            if temp in visited:
                continue
            visited.add(temp)
            self.way = self.graph_walk if not route else self.graph_car
            for j, edge_cost in self.way[temp].items():
                if j not in visited:
                    new_cost = self.node_data[temp]['cost'] + edge_cost
                    if new_cost < self.node_data[j]['cost']:
                        self.node_data[j]['cost'] = new_cost
                        self.node_data[j]['pred'] = self.node_data[temp]['pred'] + [temp] if not route else [temp]
                        heappush(min_heap, (self.node_data[j]['cost'], j))
                    elif new_cost == self.node_data[j]['cost']:
                        self.node_data[j]['pred'].append(temp)


class Walk(DijkstraAlgorithm):
    def __init__(self):
        super().__init__()
        self.shortest_path = None
        self.shortest_distance = None

    def find_shortest_path(self, src, dest):
        self.dijkstra(src, False)

        self.shortest_distance = self.node_data[dest]['cost']
        self.shortest_path = self.node_data[dest]['pred'] + [dest]

        print("Shortest distance:", self.shortest_distance)
        print("Shortest path:", self.shortest_path)

    def mapping(self, dest):
        folium_path = {node: self.folium_coordinates[node] for node in self.shortest_path}
        coordinates = [value for value in folium_path.values()]
        self.map(coordinates, dest)

class Car(DijkstraAlgorithm):
    def __init__(self):
        super().__init__()
        self.path = None
        self.distance = None

    def find_shortest_path(self, src, dest):
        self.dijkstra(src, True)

        # Reconstructing the path from predecessors
        path = [dest]
        pred_node = self.node_data[dest]['pred']

        while pred_node:
            path.extend(pred_node)
            pred_node = self.node_data[pred_node[0]]['pred']

        path.reverse()

        self.distance = self.node_data[dest]['cost']
        self.path = path

        print("Shortest distance:", self.distance)
        print("Shortest path:", path)

    def mapping(self, dest):
        folium_path = {node: self.folium_coordinates[node] for node in self.path}
        coordinates = [value for value in folium_path.values()]
        print(coordinates)
        self.map(coordinates, dest)


def call_walk(src, dest):
    walk = Walk()
    walk.find_shortest_path(src, dest)
    walk.mapping(dest)

def call_car(src, dest):
    car = Car()
    car.find_shortest_path(src, dest)
    car.mapping(dest)


class Example(Frame):
    def __init__(self, parent):
        Frame.__init__(self, parent)
        f1 = GradientFrame(self, ("#82b169", "#558631"), 1, bd=0, highlightthickness=0)
        f1.pack(side="top", fill="both", expand=True)

class GradientFrame(Canvas):
    """
    Widget with gradient colors.
    """

    __tag = "GradientFrame"
    __hex_format = "#%04x%04x%04x"

    top2bottom = 1
    left2right = 2

    def __init__(self, parent, colors=("red", "black"), direction=left2right, **kw):

        kw["height"] = kw.get("height", 80)
        kw["width"] = kw.get("width", 450)

        super().__init__(parent, **kw)

        self.__geometry = [kw["width"], kw["height"]]
        self.__colors = colors
        self.__direction = direction

        self.__draw_gradient()

    def __draw_gradient(self):

        """
        Paint the Canvas with gradient colors.
        """

        self.delete(self.__tag)

        limit = self.__geometry[0] if self.__direction == self.left2right else self.__geometry[1]

        red1, green1, blue1 = self.winfo_rgb(self.__colors[0])
        red2, green2, blue2 = self.winfo_rgb(self.__colors[1])

        r_ratio = (red2 - red1) / limit
        g_ratio = (green2 - green1) / limit
        b_ratio = (blue2 - blue1) / limit

        for pixel in range(limit):
            red = int(red1 + (r_ratio * pixel))
            green = int(green1 + (g_ratio * pixel))
            blue = int(blue1 + (b_ratio * pixel))

            color = self.__hex_format % (red, green, blue)

            x1 = pixel if self.__direction == self.left2right else 0
            y1 = 0 if self.__direction == self.left2right else pixel
            x2 = pixel if self.__direction == self.left2right else self.__geometry[0]
            y2 = self.__geometry[1] if self.__direction == self.left2right else pixel

            self.create_line(x1, y1, x2, y2, tag=self.__tag, fill=color)

        self.tag_lower(self.__tag)

    def config(self, cnf=None, **kw):

        if "colors" in kw and len(kw["colors"]) > 1:
            self.__colors = kw.pop("colors")

        if "direction" in kw and kw["direction"] in (self.left2right, self.top2bottom):
            self.__direction = kw.pop("direction")

        if "height" in kw:
            self.__geometry[1] = kw["height"]

        if "width" in kw:
            self.__geometry[0] = kw["width"]

        super().config(cnf, **kw)
        self.__draw_gradient()

    def configure(self, cnf=None, **kw):
        self.config(cnf, **kw)


# GUI

root = Tk()
def page_config(page):
    page.geometry("450x800")
    page.resizable(False, False)
    page.configure(bg="#558631")
    page.title("Navi-Greedy")
    page.iconbitmap("root.ico")
page_config(root)

# SET PAGE 1 AND 2
one = Frame(root, bg="#558631")
two = Frame(root, bg="#75a459")

one.grid(row=0, column=0, sticky="e ")
two.grid(row=0, column=0, sticky="nsew")


# PAGE 1
def page_one(master):
    global start, end
    Example(master).pack(side="top", fill="both", expand=True)

    gray = "#DDDDD8"
    gray_frame = CTkFrame(master=master, fg_color=gray, bg_color="transparent", corner_radius=70, width=450, height=680)
    gray_frame.pack(side="top", fill="both", expand=True)
    gray_frame.pack_propagate(False)


    map_img = CTkImage(light_image=Image.open("map icon 1.png"),
                       dark_image=Image.open("map icon e.png"),
                       size=(180, 180)
                       )
    map_icon = CTkButton(gray_frame, image=map_img, fg_color="transparent", state="disabled", text="")
    map_icon.pack(pady=(10,0), side="top")

    navi_label =Label(master=gray_frame, text="NAVI - GREEDY", font=("Courier New TUR", 35, "bold"), fg="#1D341D", bg=gray)
    navi_label.pack(expand=False) # pady=(180,0)

    description_label = Label(master=gray_frame, text="Where do we need to be today? \n Find the best way around the campus.",
                                 font=("Avenir LT 65 Medium", 10), fg="#1D341D", bg=gray)
    description_label.pack()

    # BUTTONS
    mode_frame = CTkFrame(master=gray_frame, fg_color="white", corner_radius=35, width=300, height=42)
    mode_frame.pack(pady=(20,40))
    mode_frame.pack_propagate(False)


    def button_config(btn, status, index):
        if status:
            text = ["Walking", "Driving"]
            fg_color = "#589B56"
            text_color = "white"
        elif not status:
            text = ["Walk", "Drive"]
            fg_color = "transparent"
            text_color = "#9B9D92"

        btn.configure(text=text[index], text_color=text_color, font=("Malgun Gothic", 13, "bold"),
                      fg_color=fg_color, border_color=gray, hover_color="#1976D2",
                      corner_radius=35, width=120, height=42)

    def walk():
        global walking, driving
        walking = True
        driving = False
        button_config(walk_button, True, 0)
        button_config(drive_button, False, 1)

    def drive():
        global driving, walking
        driving = True
        walking = False
        button_config(walk_button, False, 0)
        button_config(drive_button, True, 1)


    walk_button = CTkButton(master=mode_frame, command=walk)
    drive_button = CTkButton(master=mode_frame, command=drive)

    walk()

    walk_button.pack(padx=15, pady=0, side="left")
    drive_button.pack(padx=15, pady=0, side="right")


    # DROPDOWNS
    combo_frame = CTkFrame(master=gray_frame, fg_color=gray, width=300)
    combo_frame.pack()


    cvsu_bldgs = ['Admin Building', 'CAFENR', 'CAS', 'CCJ', 'CDC', 'CED', 'CEIT', 'CON', 'CSPEAR', 'CVMBS', 'DCEE', 'DIET',
                  'Gate 1', 'Gate 2', 'Grandstand', 'Hostel Tropicana', 'ICC', 'IH 1', 'IH 2', 'Infirmary', 'LSHS', 'Library',
                  'NCRDEC', 'New CEMDS', 'OSAS', 'Old CEMDS', 'PhySci', 'Research Center', 'Rolle Hall', 'Saluysoy', 'UMall Gate']

    font = ("Malgun Gothic", 15, "bold")
    dropdown_font = ("Microsoft YaHei", 12)

    start = CTkComboBox(master=combo_frame, width=300, height=55, border_width=0, corner_radius=25,
                                     fg_color="white", button_color="white", button_hover_color="#689F38", text_color="#9B9D92",
                                     font=font, dropdown_font=dropdown_font, values=cvsu_bldgs)

    end = CTkComboBox(master=combo_frame, width=300, height=55, border_width=0, corner_radius=25,
                                fg_color="white", button_color="white", button_hover_color="#689F38", text_color="#9B9D92",
                                font=font, dropdown_font=dropdown_font, values=cvsu_bldgs)



    start.set("Your Location")
    end.set("Destination")

    start.pack(pady=(0,15))
    end.pack(padx=0, pady=1, side="left")

    def convert(loc):
        letter = ""
        if loc == "Gate 1":
            letter = "A"
        elif loc == "UMall Gate":
            letter = "B"
        elif loc == "OSAS" or loc == "CSPEAR":
            letter = "C"
        elif loc == "New CEMDS" or loc == "CAFENR":
            letter = "E"
        elif loc == "Library" or loc == "Research Center":
            letter = "F"
        elif loc == "PhySci" or loc == "Old CEMDS":
            letter = "H"
        elif loc == "Saluysoy" or loc == "Hostel Tropicana":
            letter = "J"
        elif loc == "CVMBS":
            letter = "K"
        elif loc == "DCEE" or loc == "DIET":
            letter = "M"
        elif loc == "Admin Building" or loc == "CEIT":
            letter = "N"
        elif loc == "CED":
            letter = "O"
        elif loc == "Gate 2":
            letter = "P"
        elif loc == "CCJ" or loc == "Infirmary":
            letter = "Q"
        elif loc == "CON":
            letter = "R"
        elif loc == "IH 2":
            letter = "S"
        elif loc == "ICC" or loc == "Rolle Hall":
            letter = "T"
        elif loc == "IH 1":
            letter = "U"
        elif loc == "CAS":
            letter = "V"
        elif loc == "LSHS" or loc == "Grandstand":
            letter = "W"
        elif loc == "NCRDEC":
            letter = "Y"
        elif loc == "CDC":
            letter = "Z"

        return letter

    def emergency_toggle():
        if emergency.get() == 1:
            set_appearance_mode("dark")
            indang_hotline.configure(text_color="#F6FFEF")
            emergency_num.configure(text_color="#F6FFEF")

        elif emergency.get() == 0:
            set_appearance_mode("light")
            indang_hotline.configure(text_color="#558631")
            emergency_num.configure(text_color="#558631")

    emergency = CTkSwitch(master=master, text="EMERGENCY", font=("Bahnschrift SemiBold", 14, "bold"), text_color=("#F6FFEF", "#FFBF5F"),
                              progress_color="#FFBF5F", bg_color="transparent",
                              width=150, height=25, switch_width=29, switch_height=16,
                              command=emergency_toggle)
    emergency.pack(padx=15, pady=5, side="left", anchor="s")

    indang_hotline = CTkLabel(master, text="INDANG HOTLINES:", font=("Bahnschrift SemiBold", 14),
                                  text_color="#558631", bg_color="transparent")

    emergency_num = CTkLabel(master, text="PNP:  0949-184-9145 \nBFP:  0975-273-3574", font=("Bahnschrift SemiBold", 11),
                                 text_color="#558631", bg_color="transparent")

    indang_hotline.pack(padx=15, pady=5, side="left", anchor="s")
    emergency_num.pack(padx=0, pady=5, side="left", anchor="s")



    def generate_map():
        global walking, generated_map_icon

        # GENERATE ROUTE
        if emergency.get() == 1 and driving:
            walking = True
        elif emergency.get() == 0 and driving:
            walking = False


        if start.get() in cvsu_bldgs and end.get() in cvsu_bldgs:
            a = start.get()
            z = end.get()

            source = convert(a)
            destination = convert(z)

            if walking:
                call_walk(source, destination)
            elif driving and not walking:
                call_car(source, destination)

            loc.configure(text=a)
            des.configure(text=z)


            generated_map = CTkImage(Image.open(f"screenshot.png"), size=(432, 640))
            generated_map_icon = CTkButton(two, fg_color="#589B56", image=generated_map, text="", state="disabled",
                                           height=658, corner_radius=5)
            generated_map_icon.pack(side="bottom")

            print(source, destination)
            two.tkraise()

        else:
            # FOR INVALID COMBOBOX INPUT/VALUE
            print("Invalid Input")

            err = Tk()
            err.geometry("250x150")
            err.resizable(False,False)
            err.title("Error")

            text = Label(err, text="Invalid input! Please choose a \nlocation from the dropdown button.",
                         font=("Bahnschrift", 10))

            ok_btn = Button(err, text="OK", width=8, height=1, bg="#DFDFDF", relief="groove", command=err.destroy)

            text.pack(pady=(15, 0), fill="both", expand=True)
            ok_btn.pack(pady=15, ipady=0)
            err.mainloop()

            pass



    generate = CTkButton(master=gray_frame, text="Generate Map", font=("Mont", 25, "bold"),
                             fg_color="#589B56", text_color="white", hover_color="#1976D2",
                             corner_radius=20, width=300, height=55, command=generate_map) #lambda: [generate_map, two.tkraise()])
    generate.pack(pady=40)

def page_two():
    global loc, des

    loc_pic = CTkImage(Image.open("circle.png"), size=(22, 22))
    des_pic = CTkImage(Image.open("destination.png"), size=(22, 22))

    def lbl_config(img):
        lbl = CTkButton(two, width=200, height=40, corner_radius=32,
                      text="", font=("Malgun Gothic", 15, "bold"),
                      text_color="#696969", fg_color="white",
                      image=img, anchor="w", state="disabled")

        return lbl

    loc = lbl_config(loc_pic)
    des = lbl_config(des_pic)

    loc.pack(pady=(30, 5), side="top")
    des.pack(pady=5, side="top")

    back = CTkButton(two, text="❮  BACK", font=("Yu Gothic UI Semibold", 14), text_color="#F9F9F7", fg_color="transparent", hover_color="#1976D2",
                     width=48, height=16, corner_radius=12,
                     command=lambda: [one.tkraise(), generated_map_icon.destroy()])
    back.place(x=25, y=110)


if __name__ == "__main__":
    page_one(one)
    page_two()
    one.tkraise()

    root.mainloop()