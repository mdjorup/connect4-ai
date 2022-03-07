from flask import Flask, jsonify, request
from flask_cors import CORS
import copy
import json


app = Flask(__name__)
CORS(app)

def valid_moves(board):
  moves = []
  for i in range(len(board[0])):
    if board[0][i] == "":
       moves.append(i)
  return moves

def getWinner(board, color):
  for i in range(7):
    for j in range(4):
      if board[i][j] == color or board[i][j+1] == color or board[i][j+2] == color or board[i][j+3] == color:
        return True
  for i in range(4):
     for j in range(7):
       if board[i][j] == color or board[i+1][j] == color or board[i+2][j] == color or board[i+3][j] == color:
         return True
  for i in range(4):
     for j in range(4):
       if board[i][j] == color or board[i+1][j+1] == color or board[i+2][j+2] == color or board[i+3][j+3] == color:
         return True
  for i in range(4):
     for j in range(3, 7):
       if board[i][j] == color or board[i+1][j-1] == color or board[i+2][j-2] == color or board[i+3][j-3] == color:
         return True
  return False

def evaluate(board, redPaths, yellowPaths, color):
  sumRedPaths = 0
  sumYellowPaths = 0

  if getWinner(board, color) and color == 'y':
    return 100000
  elif getWinner(board, color) and color == 'r':
    return -100000

  for r in range(7):
    for c in range(7):
      sumRedPaths += redPaths[r][c]
      sumYellowPaths += yellowPaths[r][c]

  return sumYellowPaths - sumYellowPaths

def update_paths(board, colorPaths, color, r, c):
  lines = copy.deepcopy(colorPaths)

  lines[r][c] = 0

  dirs = [[1, 1], [1, 0], [1, -1], [0, -1]]
  for dir in dirs:
    for i in range(1, 4):
      cur_r = r + i*dir[0]
      cur_c = c + i*dir[1]
      if cur_c < 0 or cur_c > 6 or cur_r < 0 or cur_r > 6:
        break
      if lines[cur_r][cur_c] == 0:
        continue
      
      check1 = cur_r-1*dir[0]
      check2 = cur_c-1*dir[1]
      check3 = cur_r-2*dir[0]
      check4 = cur_c-2*dir[1]
      check5 = cur_r-3*dir[0]
      check6 = cur_c-3*dir[1]

      bigCheck1 = check1 >= 0 and check1 <= 6 and check2 >= 0 and check2 <= 6 and board[check1][check1] == color
      bigCheck2 = check3 >= 0 and check3 <= 6 and check4 >= 0 and check4 <= 6 and board[check3][check4] == color
      bigCheck3 = check5 >= 0 and check5 <= 6 and check6 >= 0 and check6 <= 6 and board[check5][check6] == color

      if bigCheck1 or bigCheck2 or bigCheck3:
        continue
      if check5 < 0 or check5 > 6 or check6 < 0 or check6 > 6:
        continue

      lines[cur_r][cur_c] -= 1

  return lines

def place_piece(board, redPaths, yellowPaths, color, column):

  next_board = copy.deepcopy(board)
  next_red = copy.deepcopy(redPaths)
  next_yellow = copy.deepcopy(yellowPaths)

  r = 6
  while r > 0 and next_board[r][column] != "":
    r -= 1

  if color == 'y':
    next_red = update_paths(next_board, next_red, 'y', r, column)
  else:
    next_yellow = update_paths(next_board, next_yellow, 'r', r, column)
  
  next_board[r][column] = color

  return next_board, next_red, next_yellow

def get_optimal_move(board, redPaths, yellowPaths, depth, alpha, beta, aiTurn):
  return

  

@app.route('/move/', methods=['GET', 'POST'])
def hello(): 
  data = json.loads(request.data)
  print(data.get('board', "no board"))
  return "Hello"


if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5000)