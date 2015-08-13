package com.utn.frba.rampas.domain;

public class Point 
{

	public double x;
	public double y;
	
	public Point(double x, double y)
	{
		setX(x);
		setY(y);
		this.x = x;
		this.y = y;
	}

	public double getX()
	{
		return x;
	}
	
	public void setX(double x)
	{
		this.x =x;
	}

	public double getY()
	{
		return y;
	}
	
	public void setY(double y)
	{
		this.y =y;
	}	
	
//	@Override
//	public String toString()
//	{
//		return String.format("(%.2f,%.2f)", x, y);
//	}

}
