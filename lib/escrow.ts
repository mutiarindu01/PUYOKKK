import { ethers } from 'ethers'
import { createClientSupabaseClient } from './supabase'

// EscrowPUYOK Smart Contract ABI (Full ABI from user's contract)
const ESCROW_ABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "target",
				"type": "address"
			}
		],
		"name": "AddressEmptyCode",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "implementation",
				"type": "address"
			}
		],
		"name": "ERC1967InvalidImplementation",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "ERC1967NonPayable",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "FailedCall",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "InvalidInitialization",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "NotInitializing",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "UUPSUnauthorizedCallContext",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "slot",
				"type": "bytes32"
			}
		],
		"name": "UUPSUnsupportedProxiableUUID",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "method",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "status",
				"type": "bool"
			}
		],
		"name": "AllowedPaymentMethodUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "target",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "isAsset",
				"type": "bool"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "status",
				"type": "bool"
			}
		],
		"name": "BlacklistUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "orderId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "by",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "reason",
				"type": "string"
			}
		],
		"name": "DisputeRaised",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "orderId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "resolver",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "refunded",
				"type": "bool"
			}
		],
		"name": "DisputeResolved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "tokenAddress",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "EmergencyWithdrawal",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "EmergencyWithdrawalETH",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "newAddress",
				"type": "address"
			}
		],
		"name": "FeeAddressUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newPercent",
				"type": "uint256"
			}
		],
		"name": "FeePercentUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "gasCost",
				"type": "uint256"
			}
		],
		"name": "GasSponsored",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint64",
				"name": "version",
				"type": "uint64"
			}
		],
		"name": "Initialized",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "orderId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "cancelledBy",
				"type": "address"
			}
		],
		"name": "OrderCancelled",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "orderId",
				"type": "uint256"
			}
		],
		"name": "OrderCompleted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "orderId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "seller",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "assetAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "enum EscrowPUYOK.AssetType",
				"name": "assetType",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "paymentMethod",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "notes",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "metadataURI",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "enum EscrowPUYOK.PaymentChannel",
				"name": "paymentChannel",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "orderFeePercent",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "createdAt",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "enum EscrowPUYOK.OrderType",
				"name": "orderType",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "isSpecialBehavior",
				"type": "bool"
			}
		],
		"name": "OrderCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "orderId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			}
		],
		"name": "OrderLocked",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "Paused",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "relayer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "status",
				"type": "bool"
			}
		],
		"name": "RelayerUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "newForwarder",
				"type": "address"
			}
		],
		"name": "TrustedForwarderSet",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "Unpaused",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "implementation",
				"type": "address"
			}
		],
		"name": "Upgraded",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "UPGRADE_INTERFACE_VERSION",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "allowedNFTCollections",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "allowedPaymentMethods",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_orderId",
				"type": "uint256"
			}
		],
		"name": "autoCancelExpiredOrder",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_assetAddress",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "_status",
				"type": "bool"
			}
		],
		"name": "blacklistAsset",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_userAddress",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "_status",
				"type": "bool"
			}
		],
		"name": "blacklistUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "blacklistedAssets",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "blacklistedUsers",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_orderId",
				"type": "uint256"
			}
		],
		"name": "cancelOrder",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "assetAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "assetId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "assetAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "priceInIDR",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "deadline",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "paymentMethod",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "notes",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "metadataURI",
						"type": "string"
					},
					{
						"internalType": "enum EscrowPUYOK.PaymentChannel",
						"name": "paymentChannel",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "orderFeePercent",
						"type": "uint256"
					},
					{
						"internalType": "enum EscrowPUYOK.OrderType",
						"name": "orderType",
						"type": "uint8"
					},
					{
						"internalType": "bool",
						"name": "isSpecialBehavior",
						"type": "bool"
					},
					{
						"internalType": "enum EscrowPUYOK.AssetType",
						"name": "assetType",
						"type": "uint8"
					}
				],
				"internalType": "struct EscrowPUYOK.OrderInput",
				"name": "input",
				"type": "tuple"
			}
		],
		"name": "createOrderERC1155",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "assetAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "assetId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "assetAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "priceInIDR",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "deadline",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "paymentMethod",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "notes",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "metadataURI",
						"type": "string"
					},
					{
						"internalType": "enum EscrowPUYOK.PaymentChannel",
						"name": "paymentChannel",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "orderFeePercent",
						"type": "uint256"
					},
					{
						"internalType": "enum EscrowPUYOK.OrderType",
						"name": "orderType",
						"type": "uint8"
					},
					{
						"internalType": "bool",
						"name": "isSpecialBehavior",
						"type": "bool"
					},
					{
						"internalType": "enum EscrowPUYOK.AssetType",
						"name": "assetType",
						"type": "uint8"
					}
				],
				"internalType": "struct EscrowPUYOK.OrderInput",
				"name": "input",
				"type": "tuple"
			}
		],
		"name": "createOrderERC20",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "assetAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "assetId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "assetAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "priceInIDR",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "deadline",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "paymentMethod",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "notes",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "metadataURI",
						"type": "string"
					},
					{
						"internalType": "enum EscrowPUYOK.PaymentChannel",
						"name": "paymentChannel",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "orderFeePercent",
						"type": "uint256"
					},
					{
						"internalType": "enum EscrowPUYOK.OrderType",
						"name": "orderType",
						"type": "uint8"
					},
					{
						"internalType": "bool",
						"name": "isSpecialBehavior",
						"type": "bool"
					},
					{
						"internalType": "enum EscrowPUYOK.AssetType",
						"name": "assetType",
						"type": "uint8"
					}
				],
				"internalType": "struct EscrowPUYOK.OrderInput",
				"name": "input",
				"type": "tuple"
			}
		],
		"name": "createOrderERC721",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "disputeReason",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "emergencyWithdrawERC1155",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "emergencyWithdrawERC20",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "emergencyWithdrawERC721",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "to",
				"type": "address"
			}
		],
		"name": "emergencyWithdrawETH",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_orderId",
				"type": "uint256"
			}
		],
		"name": "estimateReleaseFee",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "feeAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "feePercent",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getActiveOrders",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address payable",
						"name": "seller",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "buyer",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "assetAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "assetId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "assetAmount",
						"type": "uint256"
					},
					{
						"internalType": "enum EscrowPUYOK.AssetType",
						"name": "assetType",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "enum EscrowPUYOK.OrderStatus",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "lockedAt",
						"type": "uint256"
					},
					{
						"internalType": "uint224",
						"name": "deadline",
						"type": "uint224"
					},
					{
						"internalType": "string",
						"name": "paymentMethod",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "notes",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "metadataURI",
						"type": "string"
					},
					{
						"internalType": "enum EscrowPUYOK.PaymentChannel",
						"name": "paymentChannel",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "orderFeePercent",
						"type": "uint256"
					},
					{
						"internalType": "uint224",
						"name": "createdAt",
						"type": "uint224"
					},
					{
						"internalType": "enum EscrowPUYOK.OrderType",
						"name": "orderType",
						"type": "uint8"
					}
				],
				"internalType": "struct EscrowPUYOK.Order[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			}
		],
		"name": "getNonce",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_orderId",
				"type": "uint256"
			}
		],
		"name": "getOrderById",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address payable",
						"name": "seller",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "buyer",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "assetAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "assetId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "assetAmount",
						"type": "uint256"
					},
					{
						"internalType": "enum EscrowPUYOK.AssetType",
						"name": "assetType",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "enum EscrowPUYOK.OrderStatus",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "lockedAt",
						"type": "uint256"
					},
					{
						"internalType": "uint224",
						"name": "deadline",
						"type": "uint224"
					},
					{
						"internalType": "string",
						"name": "paymentMethod",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "notes",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "metadataURI",
						"type": "string"
					},
					{
						"internalType": "enum EscrowPUYOK.PaymentChannel",
						"name": "paymentChannel",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "orderFeePercent",
						"type": "uint256"
					},
					{
						"internalType": "uint224",
						"name": "createdAt",
						"type": "uint224"
					},
					{
						"internalType": "enum EscrowPUYOK.OrderType",
						"name": "orderType",
						"type": "uint8"
					}
				],
				"internalType": "struct EscrowPUYOK.Order",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "enum EscrowPUYOK.OrderStatus",
				"name": "status",
				"type": "uint8"
			}
		],
		"name": "getOrdersByStatus",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address payable",
						"name": "seller",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "buyer",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "assetAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "assetId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "assetAmount",
						"type": "uint256"
					},
					{
						"internalType": "enum EscrowPUYOK.AssetType",
						"name": "assetType",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "enum EscrowPUYOK.OrderStatus",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "lockedAt",
						"type": "uint256"
					},
					{
						"internalType": "uint224",
						"name": "deadline",
						"type": "uint224"
					},
					{
						"internalType": "string",
						"name": "paymentMethod",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "notes",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "metadataURI",
						"type": "string"
					},
					{
						"internalType": "enum EscrowPUYOK.PaymentChannel",
						"name": "paymentChannel",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "orderFeePercent",
						"type": "uint256"
					},
					{
						"internalType": "uint224",
						"name": "createdAt",
						"type": "uint224"
					},
					{
						"internalType": "enum EscrowPUYOK.OrderType",
						"name": "orderType",
						"type": "uint8"
					}
				],
				"internalType": "struct EscrowPUYOK.Order[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getOrdersByUser",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address payable",
						"name": "seller",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "buyer",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "assetAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "assetId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "assetAmount",
						"type": "uint256"
					},
					{
						"internalType": "enum EscrowPUYOK.AssetType",
						"name": "assetType",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "enum EscrowPUYOK.OrderStatus",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "lockedAt",
						"type": "uint256"
					},
					{
						"internalType": "uint224",
						"name": "deadline",
						"type": "uint224"
					},
					{
						"internalType": "string",
						"name": "paymentMethod",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "notes",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "metadataURI",
						"type": "string"
					},
					{
						"internalType": "enum EscrowPUYOK.PaymentChannel",
						"name": "paymentChannel",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "orderFeePercent",
						"type": "uint256"
					},
					{
						"internalType": "uint224",
						"name": "createdAt",
						"type": "uint224"
					},
					{
						"internalType": "enum EscrowPUYOK.OrderType",
						"name": "orderType",
						"type": "uint8"
					}
				],
				"internalType": "struct EscrowPUYOK.Order[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_initialOwner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_feeAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_feePercent",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_initialTrustedForwarder",
				"type": "address"
			}
		],
		"name": "initialize",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_orderId",
				"type": "uint256"
			}
		],
		"name": "lockOrderForPayment",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"name": "onERC1155BatchReceived",
		"outputs": [
			{
				"internalType": "bytes4",
				"name": "",
				"type": "bytes4"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"name": "onERC1155Received",
		"outputs": [
			{
				"internalType": "bytes4",
				"name": "",
				"type": "bytes4"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"name": "onERC721Received",
		"outputs": [
			{
				"internalType": "bytes4",
				"name": "",
				"type": "bytes4"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "orderCounter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "orders",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "seller",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "assetAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "assetId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "assetAmount",
				"type": "uint256"
			},
			{
				"internalType": "enum EscrowPUYOK.AssetType",
				"name": "assetType",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "enum EscrowPUYOK.OrderStatus",
				"name": "status",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "lockedAt",
				"type": "uint256"
			},
			{
				"internalType": "uint224",
				"name": "deadline",
				"type": "uint224"
			},
			{
				"internalType": "string",
				"name": "paymentMethod",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "notes",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "metadataURI",
				"type": "string"
			},
			{
				"internalType": "enum EscrowPUYOK.PaymentChannel",
				"name": "paymentChannel",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "orderFeePercent",
				"type": "uint256"
			},
			{
				"internalType": "uint224",
				"name": "createdAt",
				"type": "uint224"
			},
			{
				"internalType": "enum EscrowPUYOK.OrderType",
				"name": "orderType",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "pause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "paused",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "proxiableUUID",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_orderId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_reason",
				"type": "string"
			}
		],
		"name": "raiseDispute",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "relayers",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_orderId",
				"type": "uint256"
			}
		],
		"name": "releaseAssetToBuyer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "gasCost",
				"type": "uint256"
			}
		],
		"name": "reportGasSponsored",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_orderId",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "_refundToBuyer",
				"type": "bool"
			}
		],
		"name": "resolveDispute",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_collectionAddress",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "_status",
				"type": "bool"
			}
		],
		"name": "setAllowedNFTCollection",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_method",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "_status",
				"type": "bool"
			}
		],
		"name": "setAllowedPaymentMethod",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_newFeeAddress",
				"type": "address"
			}
		],
		"name": "setFeeAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_newFeePercent",
				"type": "uint256"
			}
		],
		"name": "setFeePercent",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_relayerAddress",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "_status",
				"type": "bool"
			}
		],
		"name": "setRelayer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_newTrustedForwarder",
				"type": "address"
			}
		],
		"name": "setTrustedForwarder",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "successfulTrades",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalGasSponsored",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "trustedForwarder",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "unpause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newImplementation",
				"type": "address"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "upgradeToAndCall",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "version",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

export interface EscrowDetails {
  id: string
  contractAddress: string
  orderId: string
  buyerId: string
  sellerId: string
  assetDetails: {
    type: 'ERC20' | 'ERC721' | 'ERC1155'
    contractAddress: string
    tokenId?: string
    amount: number
  }
  paymentAmount: number
  currency: string
  escrowFee: number
  insuranceFee: number
  status: 'created' | 'funded' | 'released' | 'disputed' | 'cancelled'
  milestones: {
    id: string
    name: string
    completed: boolean
    timestamp?: string
  }[]
  disputeId?: string
  createdAt: string
  expiresAt: string
}

export interface CreateEscrowParams {
  orderId: string
  buyerAddress: string
  sellerAddress: string
  assetDetails: EscrowDetails['assetDetails']
  paymentAmount: number
  currency: string
  expirationDays: number
}

export class EscrowService {
  private provider: ethers.JsonRpcProvider | null = null
  private contract: ethers.Contract | null = null
  private supabase = createClientSupabaseClient()

  constructor() {
    this.initializeProvider()
  }

  private initializeProvider() {
    try {
      // Initialize provider (you can use Infura, Alchemy, etc.)
      const infuraId = process.env.INFURA_PROJECT_ID
      const contractAddress = process.env.ESCROW_CONTRACT_ADDRESS || '0x86391Db0f7614E31cBAefB0b881F2fb3dbfFBFFb'

      // Use fallback RPC if Infura not configured
      const rpcUrl = infuraId
        ? `https://mainnet.infura.io/v3/${infuraId}`
        : 'https://eth-sepolia.g.alchemy.com/v2/demo' // Fallback for development

      this.provider = new ethers.JsonRpcProvider(rpcUrl)

      // Initialize contract with your address
      this.contract = new ethers.Contract(
        contractAddress,
        ESCROW_ABI,
        this.provider
      )

      console.log('🔗 Escrow service initialized with contract:', contractAddress)
    } catch (error) {
      console.error('Failed to initialize escrow provider:', error)
    }
  }

  // Create Escrow Contract
  async createEscrow(params: CreateEscrowParams, signerPrivateKey: string): Promise<EscrowDetails | null> {
    try {
      if (!this.provider || !this.contract) {
        throw new Error('Escrow service not configured')
      }

      const signer = new ethers.Wallet(signerPrivateKey, this.provider)
      const contractWithSigner = this.contract.connect(signer) as ethers.Contract

      // Calculate fees
      const escrowFee = params.paymentAmount * 0.01 // 1% escrow fee
      const insuranceFee = params.paymentAmount * 0.005 // 0.5% insurance fee
      const totalAmount = params.paymentAmount + escrowFee + insuranceFee

      // Create order hash for verification
      const orderHash = ethers.keccak256(
        ethers.AbiCoder.defaultAbiCoder().encode(
          ['string', 'address', 'address', 'uint256'],
          [params.orderId, params.buyerAddress, params.sellerAddress, params.paymentAmount]
        )
      )

      // Execute smart contract transaction
      const tx = await contractWithSigner.createEscrow(
        params.buyerAddress,
        params.sellerAddress,
        ethers.parseEther(params.paymentAmount.toString()),
        orderHash,
        { value: ethers.parseEther(totalAmount.toString()) }
      )

      const receipt = await tx.wait()
      
      // Extract escrow ID from event logs
      const escrowCreatedEvent = receipt.logs?.find(
        (log: any) => {
          try {
            const parsedLog = contractWithSigner.interface.parseLog(log)
            return parsedLog?.name === 'EscrowCreated'
          } catch {
            return false
          }
        }
      )
      
      if (!escrowCreatedEvent) {
        throw new Error('Escrow creation event not found')
      }

      const parsedLog = contractWithSigner.interface.parseLog(escrowCreatedEvent)
      const escrowId = parsedLog?.args?.escrowId?.toString()

      // Create escrow record in database
      const expirationDate = new Date()
      expirationDate.setDate(expirationDate.getDate() + params.expirationDays)

      const escrowData = {
        contract_address: this.contract.target,
        order_id: params.orderId,
        buyer_id: params.buyerAddress,
        seller_id: params.sellerAddress,
        asset_details: params.assetDetails,
        payment_amount: params.paymentAmount,
        currency: params.currency,
        escrow_fee: escrowFee,
        insurance_fee: insuranceFee,
        status: 'created' as const,
        milestones: [
          { id: '1', name: 'Escrow Created', completed: true, timestamp: new Date().toISOString() },
          { id: '2', name: 'Payment Confirmed', completed: false },
          { id: '3', name: 'Asset Transferred', completed: false },
          { id: '4', name: 'Buyer Confirmation', completed: false },
          { id: '5', name: 'Release Funds', completed: false }
        ],
        expires_at: expirationDate.toISOString()
      }

      const { data: createdEscrow, error } = await this.supabase
        .from('escrow_contracts')
        .insert(escrowData)
        .select()
        .single()

      if (error) throw error

      return this.mapDatabaseEscrowToEscrowDetails(createdEscrow)
    } catch (error) {
      console.error('Create escrow failed:', error)
      return null
    }
  }

  // Release Escrow (when both parties agree)
  async releaseEscrow(escrowId: string, signerPrivateKey: string): Promise<boolean> {
    try {
      if (!this.provider || !this.contract) {
        throw new Error('Escrow service not configured')
      }

      const signer = new ethers.Wallet(signerPrivateKey, this.provider)
      const contractWithSigner = this.contract.connect(signer) as ethers.Contract

      // Execute release transaction
      const tx = await contractWithSigner.releaseEscrow(escrowId)
      await tx.wait()

      // Update database
      const { error } = await this.supabase
        .from('escrow_contracts')
        .update({
          status: 'released',
          milestones: [
            // You would update the milestones array here
          ]
        })
        .eq('id', escrowId)

      if (error) throw error

      return true
    } catch (error) {
      console.error('Release escrow failed:', error)
      return false
    }
  }

  // Dispute Escrow
  async disputeEscrow(escrowId: string, reason: string, evidence: any[], signerPrivateKey: string): Promise<boolean> {
    try {
      if (!this.provider || !this.contract) {
        throw new Error('Escrow service not configured')
      }

      const signer = new ethers.Wallet(signerPrivateKey, this.provider)
      const contractWithSigner = this.contract.connect(signer) as ethers.Contract

      // Execute dispute transaction
      const tx = await contractWithSigner.disputeEscrow(escrowId, reason)
      await tx.wait()

      // Create dispute record
      const { data: dispute, error: disputeError } = await this.supabase
        .from('disputes')
        .insert({
          order_id: escrowId, // This should be the actual order ID
          escrow_id: escrowId,
          complainant_id: signer.address,
          respondent_id: '', // You'd need to determine this
          reason,
          status: 'open',
          priority: 'medium',
          evidence
        })
        .select()
        .single()

      if (disputeError) throw disputeError

      // Update escrow status
      const { error } = await this.supabase
        .from('escrow_contracts')
        .update({
          status: 'disputed',
          dispute_id: dispute.id
        })
        .eq('id', escrowId)

      if (error) throw error

      return true
    } catch (error) {
      console.error('Dispute escrow failed:', error)
      return false
    }
  }

  // Cancel Escrow (before funding)
  async cancelEscrow(escrowId: string, signerPrivateKey: string): Promise<boolean> {
    try {
      if (!this.provider || !this.contract) {
        throw new Error('Escrow service not configured')
      }

      const signer = new ethers.Wallet(signerPrivateKey, this.provider)
      const contractWithSigner = this.contract.connect(signer) as ethers.Contract

      const tx = await contractWithSigner.cancelEscrow(escrowId)
      await tx.wait()

      // Update database
      const { error } = await this.supabase
        .from('escrow_contracts')
        .update({ status: 'cancelled' })
        .eq('id', escrowId)

      if (error) throw error

      return true
    } catch (error) {
      console.error('Cancel escrow failed:', error)
      return false
    }
  }

  // Get Escrow Details
  async getEscrowDetails(escrowId: string): Promise<EscrowDetails | null> {
    try {
      const { data: escrow, error } = await this.supabase
        .from('escrow_contracts')
        .select('*')
        .eq('id', escrowId)
        .single()

      if (error) throw error

      return this.mapDatabaseEscrowToEscrowDetails(escrow)
    } catch (error) {
      console.error('Get escrow details failed:', error)
      return null
    }
  }

  // Get User Escrows
  async getUserEscrows(userId: string): Promise<EscrowDetails[]> {
    try {
      const { data: escrows, error } = await this.supabase
        .from('escrow_contracts')
        .select('*')
        .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`)
        .order('created_at', { ascending: false })

      if (error) throw error

      return escrows.map(escrow => this.mapDatabaseEscrowToEscrowDetails(escrow))
    } catch (error) {
      console.error('Get user escrows failed:', error)
      return []
    }
  }

  // Update Milestone
  async updateMilestone(escrowId: string, milestoneId: string, completed: boolean): Promise<boolean> {
    try {
      // Get current escrow
      const { data: escrow, error: fetchError } = await this.supabase
        .from('escrow_contracts')
        .select('milestones')
        .eq('id', escrowId)
        .single()

      if (fetchError) throw fetchError

      // Update milestones
      const milestones = escrow.milestones.map((milestone: any) => {
        if (milestone.id === milestoneId) {
          return {
            ...milestone,
            completed,
            timestamp: completed ? new Date().toISOString() : undefined
          }
        }
        return milestone
      })

      // Update database
      const { error } = await this.supabase
        .from('escrow_contracts')
        .update({ milestones })
        .eq('id', escrowId)

      if (error) throw error

      return true
    } catch (error) {
      console.error('Update milestone failed:', error)
      return false
    }
  }

  // Automated Escrow Release (based on milestones)
  async checkAndAutoRelease(escrowId: string): Promise<boolean> {
    try {
      const escrowDetails = await this.getEscrowDetails(escrowId)
      if (!escrowDetails) return false

      // Check if all milestones are completed
      const allMilestonesCompleted = escrowDetails.milestones.every(m => m.completed)
      
      if (allMilestonesCompleted && escrowDetails.status === 'funded') {
        // Auto-release after 24 hours if no disputes
        const releaseTime = new Date(escrowDetails.createdAt)
        releaseTime.setHours(releaseTime.getHours() + 24)
        
        if (new Date() >= releaseTime) {
          // Use system private key for auto-release
          const privateKey = process.env.PRIVATE_KEY
          if (privateKey) {
            return await this.releaseEscrow(escrowId, privateKey)
          }
        }
      }

      return false
    } catch (error) {
      console.error('Auto release check failed:', error)
      return false
    }
  }

  // Calculate Escrow Fees
  calculateFees(amount: number): { escrowFee: number; insuranceFee: number; total: number } {
    const escrowFee = amount * 0.01 // 1%
    const insuranceFee = amount * 0.005 // 0.5%
    return {
      escrowFee,
      insuranceFee,
      total: amount + escrowFee + insuranceFee
    }
  }

  // Private helper method
  private mapDatabaseEscrowToEscrowDetails(dbEscrow: any): EscrowDetails {
    return {
      id: dbEscrow.id,
      contractAddress: dbEscrow.contract_address,
      orderId: dbEscrow.order_id,
      buyerId: dbEscrow.buyer_id,
      sellerId: dbEscrow.seller_id,
      assetDetails: dbEscrow.asset_details,
      paymentAmount: dbEscrow.payment_amount,
      currency: dbEscrow.currency,
      escrowFee: dbEscrow.escrow_fee,
      insuranceFee: dbEscrow.insurance_fee,
      status: dbEscrow.status,
      milestones: dbEscrow.milestones,
      disputeId: dbEscrow.dispute_id,
      createdAt: dbEscrow.created_at,
      expiresAt: dbEscrow.expires_at
    }
  }
}

// Hook for client-side usage
export const useEscrow = () => {
  const escrowService = new EscrowService()
  
  return {
    createEscrow: escrowService.createEscrow.bind(escrowService),
    releaseEscrow: escrowService.releaseEscrow.bind(escrowService),
    disputeEscrow: escrowService.disputeEscrow.bind(escrowService),
    cancelEscrow: escrowService.cancelEscrow.bind(escrowService),
    getEscrowDetails: escrowService.getEscrowDetails.bind(escrowService),
    getUserEscrows: escrowService.getUserEscrows.bind(escrowService),
    updateMilestone: escrowService.updateMilestone.bind(escrowService),
    checkAndAutoRelease: escrowService.checkAndAutoRelease.bind(escrowService),
    calculateFees: escrowService.calculateFees.bind(escrowService)
  }
}
