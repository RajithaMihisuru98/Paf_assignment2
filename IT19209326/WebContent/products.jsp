<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
     <%@page import = "com.Product" %>
      
     
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Product handling</title>


<link rel = "stylesheet" href = "Views/bootstrap.min.css">
<script src = "Components/jquery-3.6.0.min.js"></script>
<script src = "Components/products.js"></script>



</head>
<body>

<body background  ='graphics/root.jpg'> 

<div class = "container"> 
	<div class="row">
		<div class="col-8">
		
		

		<h1 style="color:DarkBlue;"> Products Management</h1>
		
	<form id="formProduct" name="formProduct"  >
		Name:
		<input id="product_name" name="product_name" type="text" class="form-control form-control-sm"><br>
		Owner:
		<input id="owner" name="owner" type="text" class="form-control form-control-sm"><br>
		Description:
		<input id="description" name="description" type="text" class="form-control form-control-sm"><br>
        price:
		<input id="price" name="price" type="text" class="form-control form-control-sm"><br>
		Email:
		<input id="email" name="email" type="text" class="form-control form-control-sm"><br>
		<input id="btnSave" name="btnSave" type="button" value="Save" class="btn btn-primary">
		<input type="hidden" id="product_id" name="product_id" value="">
	</form>
    
    <div id="alertSuccess" class="alert alert-success"></div>
     <div id="alertError" class="alert alert-danger"></div>
    
    <br>
	<div id="divProductsGrid">
	<%
	Product productObj = new Product();
		out.print(productObj.readProducts());
	%>
	</div>

<br>


</div>
</div>
</div>


</body>
</html>