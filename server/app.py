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
      if board[i][j] == color and board[i][j+1] == color and board[i][j+2] == color and board[i][j+3] == color:
        return True
  for i in range(4):
     for j in range(7):
       if board[i][j] == color and board[i+1][j] == color and board[i+2][j] == color and board[i+3][j] == color:
         return True
  for i in range(4):
     for j in range(4):
       if board[i][j] == color and board[i+1][j+1] == color and board[i+2][j+2] == color and board[i+3][j+3] == color:
         return True
  for i in range(4):
     for j in range(3, 7):
       if board[i][j] == color and board[i+1][j-1] == color and board[i+2][j-2] == color and board[i+3][j-3] == color:
         return True
  return False

def evaluate(board, redPaths, yellowPaths, color):
  sumRedPaths = 0
  sumYellowPaths = 0

  if color == 'y' and getWinner(board, color):
    return 100000
  elif color == 'r' and getWinner(board, color):
    return -100000

  for r in range(7):
    for c in range(7):
      sumRedPaths += redPaths[r][c]
      sumYellowPaths += yellowPaths[r][c]

  return sumYellowPaths - sumRedPaths

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

def alpha_beta(board, redPaths, yellowPaths, depth, alpha, beta, aiTurn):

  moves = valid_moves(board)
  if depth == 0 or len(moves) == 0:
    color = 'y' if aiTurn else 'r'
    return evaluate(board, redPaths, yellowPaths, color)
  
  if aiTurn:
    value = -100000000
    for move in moves:
      
      nboard, nred, nyellow = place_piece(board, redPaths, yellowPaths, 'y', move)
      value = max(value, alpha_beta(nboard, nred, nyellow, depth-1, alpha, beta, False))
      if value >= beta:
        break
      alpha = max(alpha, value)
    return value
  else:
    value = 100000000
    for move in moves:
      nboard, nred, nyellow = place_piece(board, redPaths, yellowPaths, 'r', move)
      value = min(value, alpha_beta(nboard, nred, nyellow, depth-1, alpha, beta, True))
      if value <= alpha:
        break
      beta = min(beta, value)
    return value

def get_optimal_move(board, redPaths, yellowPaths):
  moves = valid_moves(board)
  max_value = -10000000
  best_move = -1
  for move in moves:
    nboard, nred, nyellow = place_piece(board, redPaths, yellowPaths, 'y', move)
    value = alpha_beta(nboard, nred, nyellow, 4, -100000, 100000, False)
    if value > max_value:
      max_value = value
      best_move = move
  return best_move

  

@app.route('/move/', methods=['GET', 'POST'])
def move(): 
  data = json.loads(request.data)
  color = data.get('color')
  board = data.get('board')
  redPaths = data.get('redPaths')
  yellowPaths = data.get('yellowPaths')
  column = data.get('column', "")

  if color == 'r':
    nboard, nred, nyellow = place_piece(board, redPaths, yellowPaths, color, column)
    evaluation = evaluate(nboard, nred, nyellow, color)
    winner = getWinner(nboard, color)
    return jsonify({
      'board': nboard,
      'redPaths': nred,
      'yellowPaths': nyellow,
      'evaluation': evaluation,
      'winner': winner,
    })
  elif color == 'y':
    optimal_move = get_optimal_move(board, redPaths, yellowPaths)
    nboard, nred, nyellow = place_piece(board, redPaths, yellowPaths, color, optimal_move)
    evaluation = evaluate(nboard, nred, nyellow, color)
    winner = getWinner(nboard, color)
    return jsonify({
      'board': nboard,
      'redPaths': nred,
      'yellowPaths': nyellow,
      'evaluation': evaluation,
      'winner': winner,
    })



if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5000)