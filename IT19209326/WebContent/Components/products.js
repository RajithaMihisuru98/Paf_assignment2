$(document).ready(function()
{
	if ($("#alertSuccess").text().trim() == "")
	{
	$("#alertSuccess").hide();
	}
	$("#alertError").hide();
});

//SAVE
$(document).on("click", "#btnSave", function(event)
	{
	// Clear alerts---------------
	$("#alertSuccess").text("");
	$("#alertSuccess").hide();
	$("#alertError").text("");
	$("#alertError").hide();
	
	//Form validation----------
	var status = validateProductForm();
	if (status != true)
	{
	$("#alertError").text(status);
	$("#alertError").show();
	return;
	}
	
	// If valid---------------
	var type = ($("#product_id").val() == "") ? "POST" : "PUT";
	$.ajax(
	{
	url : "ProductsAPI",
	type : type,
	data : $("#formProduct").serialize(),
	dataType : "text",
	complete : function(response, status)
	{
	onProductSaveComplete(response.responseText, status);
	}
	});
});


function onProductSaveComplete(response, status)
{
	if (status == "success")
	{
	var resultSet = JSON.parse(response);
	if (resultSet.status.trim() == "success")
	{
	$("#alertSuccess").text("Successfully saved.");
	$("#alertSuccess").show();
	$("#divProductsGrid").html(resultSet.data);
	} else if (resultSet.status.trim() == "error")
	{
	$("#alertError").text(resultSet.data);
	$("#alertError").show();
	}
	} else if (status == "error")
	{
	$("#alertError").text("Error while saving.");
	$("#alertError").show();
	} else
	{
	$("#alertError").text("Unknown error while saving..");
	$("#alertError").show();
	}
	$("#product_id").val("");
	$("#formProduct")[0].reset();
}


$(document).on("click", ".btnUpdate", function(event)
{
	$("#product_id").val($(this).data("productid"));
	$("#product_name").val($(this).closest("tr").find('td:eq(0)').text());
	$("#owner").val($(this).closest("tr").find('td:eq(1)').text());
	$("#description").val($(this).closest("tr").find('td:eq(2)').text());
	$("#price").val($(this).closest("tr").find('td:eq(3)').text());
	$("#email").val($(this).closest("tr").find('td:eq(4)').text());
})


$(document).on("click", ".btnRemove", function(event)
{
	$.ajax(
	{
	url : "ProductsAPI",
	type : "DELETE",
	data : "product_id=" + $(this).data("productid"),
	dataType : "text",
	complete : function(response, status)
	{
	onProductDeleteComplete(response.responseText, status);
	}
	});
})


function onProductDeleteComplete(response, status)
{
	if (status == "success")
	{
	var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success")
		{
		$("#alertSuccess").text("Successfully deleted.");
		$("#alertSuccess").show();
		$("#divProductsGrid").html(resultSet.data);
		} 
		else if (resultSet.status.trim() == "error")
		{
		$("#alertError").text(resultSet.data);
		$("#alertError").show();
		}
	} 
	else if (status == "error")
	{
	$("#alertError").text("Error while deleting.");
	$("#alertError").show();
	} 
	else
	{
	$("#alertError").text("Unknown error while deleting..");
	$("#alertError").show();
	}
}

        //CLIENT-MODEL================
  function validateProductForm()
    {
	// NAME
	if ($("#product_name").val().trim() == "")
	{
	return "Insert  product Name.";
     }
	
	// OWNER
	if ($("#owner").val().trim() == "")
	{
	return "Insert  product owner.";
}
	
	// DESCRIPTION------------------------
	if ($("#description").val().trim() == "")
	{ 
	return "Insert product  Description.";
	}


// is numerical value
var PPrice = $("#price").val().trim();
if (!$.isNumeric(PPrice))
{
return "Insert a numerical value for product  Price.";
}

// convert to decimal price
$("#price").val(parseFloat(PPrice).toFixed(2));

//EMAIL------------------------
if ($("#email").val().trim() == "")
{
return "Insert email.";
}


return true;
}



