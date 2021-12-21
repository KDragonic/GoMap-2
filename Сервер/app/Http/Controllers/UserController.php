<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function login(Request $req)
    {
        if (Auth::check()) return response()->json(["messages"=>"Вы уже вошли"], 200);

        if (Auth::attempt(['email' => $email, 'password' => $password])) {
            // Authentication passed...
            return response()->json(["Messages"=>"Вы успешно вошли"], 200);
        }
    }

    public function register(Request $req)
    {
        $valid = $req->validate([
            'name' => 'required|unique:user',
            'email' => 'required|unique:user',
            'password' => 'required',
        ]);

        return response()->json($req);


        if($valid->fails()) 
		{
			return response()->json(
				[
					"message" => $valid->errors(),
				]);
		}

        $user = new User();
        $user->name = $valid->name;
        $user->email = $valid->email;
        $user->password = decrypt($valid->password); 
        Auth::login($user);
        $user->save();

        return response()->json(["messages"=>"Вы успешно разегестрировались"], 200);
    }
}
