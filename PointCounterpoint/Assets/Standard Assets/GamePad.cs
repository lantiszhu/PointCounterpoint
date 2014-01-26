using UnityEngine;
using System.Collections;

// commented out to allow for eval()
//http://answers.unity3d.com/questions/397906/whats-wrong-with-eval.html

//for now this class just holds enums
public enum Pad {
	XB,
	PS
}


//NOTE, later in development im planning on making a sexier
//version of this that reads from a file, but for now this shit
public static class GamePad
{
	private static string FormatJoystick(int player, int button) {
		return "joystick " + player + " button " + button;
	}
	
	private static string FormatAxis(string pad, string stick, string axis, int player) {
		return pad + "_" + stick + "_" + axis + "_" + player;
	}
	
	//Return the input for the game's jump button
	public static bool JumpButton(Pad pad, int player) {
		//Debug.Log("Jump Button Called");
		switch(pad) {
			case Pad.XB:
				return Input.GetKey(FormatJoystick(player,16));//xbox A button
			case Pad.PS:
				//Debug.Log("Get Button X is " + Input.GetButton("A_1"));
				return Input.GetKey(FormatJoystick(player,14));
		}
		return false;
	}
	
	//Return the input for the game's catch
	public static bool CatchButton(Pad pad, int player) {
		//Debug.Log("Catch Button Called");
		switch(pad) {
			case Pad.XB:
				return Input.GetKeyDown(FormatJoystick(player,17));//xbox B button
			case Pad.PS:
				return Input.GetKeyDown(FormatJoystick(player,8));//PS L2 button
		}
		return false;
	}
	
	//Return the input for the game's catch
	public static bool ReleaseButton(Pad pad, int player) {
		//Debug.Log("Catch Button Called");
		switch(pad) {
			case Pad.XB:
				return Input.GetKeyUp(FormatJoystick(player,17));//xbox B button
			case Pad.PS:
				return Input.GetKeyUp(FormatJoystick(player,8));//PS L2 button
		}
		return false;
	}
	
	//Return the input for the game's catch
	public static bool ShootButton(Pad pad, int player) {
		//Debug.Log("Catch Button Called");
		switch(pad) {
			case Pad.XB:
				//return (Input.GetAxis("Triggers_1") > 0);//xbox right trigger button
				return Input.GetKey(FormatJoystick(player,18));//xbox X button
			case Pad.PS:
				return Input.GetKey(FormatJoystick(player,9));//PS R2 button
		}
		return false;
	}
	
	//Return the input for left on the dpad
	public static bool LeftButton(Pad pad, int player) {
		//Debug.Log("Left Button Called");
		switch(pad) {
			case Pad.XB:
				return Input.GetKey(FormatJoystick(player,7));//xbox D AXIS
			case Pad.PS:
				return Input.GetKey(FormatJoystick(player,7));//PS left button
		}
		return false;
	}
	
	//Return the input the right on the dpad
	public static bool RightButton(Pad pad, int player) {
		//Debug.Log("Right Button Called");
		switch(pad) {
			case Pad.XB:
				return Input.GetKey(FormatJoystick(player,8));//xbox jump button
			case Pad.PS:
				return Input.GetKey(FormatJoystick(player,5));//PS right button
		}
		return false;
	}
	
	//Return the input for left stance change
	public static bool StanceLeftButton(Pad pad, int player) {
		//Debug.Log("Left Button Called");
		switch(pad) {
			case Pad.XB:
				return Input.GetKeyDown(FormatJoystick(player,13));//xbox D AXIS
			case Pad.PS:
				return Input.GetKeyDown(FormatJoystick(player,10));//PS L1
		}
		return false;
	}
	
	//Return the input for right stance change
	public static bool StanceRightButton(Pad pad, int player) {
		//Debug.Log("Left Button Called");
		switch(pad) {
			case Pad.XB:
				return Input.GetKeyDown(FormatJoystick(player,14));
			case Pad.PS:
				return Input.GetKeyDown(FormatJoystick(player,11));//PS R1
		}
		return false;
	}

	//Return the input for Start button
	public static bool StartButton(Pad pad, int player) {
		switch(pad) {
		case Pad.XB:
			return Input.GetKeyDown(FormatJoystick(player,9));
		case Pad.PS:
			return false;
		}
		return false;
	}
	
	//Return the input stick
	public static Vector2 GetLeftStick(Pad pad, int player) {
		switch(pad) {
			case Pad.XB:
				return new Vector2(Input.GetAxis(FormatAxis("XB","LS","X",player)), (Input.GetAxis(FormatAxis("XB","LS","Y",player)) * -1));
			case Pad.PS:
				return new Vector2(Input.GetAxis(FormatAxis("PS","LS","X",player)), (Input.GetAxis(FormatAxis("PS","LS","Y",player)) * -1));
		}
		return Vector2.zero;
	}
	
	//What is the value of the right analog stick
	public static Vector2 GetRightStick(Pad pad, int player) {
		switch(pad) {
			case Pad.XB:
				return new Vector2(Input.GetAxis(FormatAxis("XB","RS","X",player)), (Input.GetAxis(FormatAxis("XB","RS","Y",player)) * -1));
			case Pad.PS:
				return new Vector2(Input.GetAxis(FormatAxis("PS","RS","X",player)), (Input.GetAxis(FormatAxis("PS","RS","Y",player)) * -1));
		}
		return Vector2.zero;
	}
}

